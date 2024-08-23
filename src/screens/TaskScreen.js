import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { getTasks, createTask, updateTask, deleteTask } from '../services/ApiService';

const TaskScreen = ({ route }) => {
    const { projectId } = route.params;
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await getTasks(projectId);
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        fetchTasks();
    }, [projectId]);

    const handleAddTask = async () => {
        const newTask = {
            name: 'New Task',
            body: 'This is a new task',
            postId: projectId, 
        };
        try {
            const response = await createTask(projectId, newTask);
            setTasks([...tasks, response.data]);
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    const handleUpdateTask = async (taskId) => {
        const updatedTask = {
            name: 'Updated Task Name',
            body: 'Updated task details',
            postId: projectId,
        };
        try {
            const response = await updateTask(taskId, updatedTask);
            setTasks(tasks.map(task => task.id === taskId ? response.data : task));
        } catch (error) {
            console.error('Error updating task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Add Task" onPress={handleAddTask} />
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskItemContainer}>
                        <TouchableOpacity
                            style={styles.taskItem}
                            onPress={() => handleUpdateTask(item.id)}
                        >
                            <Text style={styles.taskName}>{item.name}</Text>
                        </TouchableOpacity>
                        <Button title="Delete" onPress={() => handleDeleteTask(item.id)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f9fa',
    },
    taskItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    taskItem: {
        flex: 1,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    taskName: {
        fontSize: 16,
        color: '#333333',
    },
});

export default TaskScreen;
