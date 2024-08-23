import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getTasks } from '../services/ApiService';

const TaskList = ({ route }) => {
    const { projectId } = route.params;  
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            try {
                console.log('Fetching tasks for project ID:', projectId);
                const response = await getTasks(projectId);
                console.log('Tasks data:', response.data);  
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        fetchTasks();
    }, [projectId]);

    return (
        <View style={styles.container}>
            {tasks.length > 0 ? (
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.taskItem}>
                            <Text style={styles.taskTitle}>{item.name || item.title}</Text>  
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.emptyMessage}>No tasks found</Text> 
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f8f9fa',
    },
    taskItem: {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    taskTitle: {
        fontSize: 16,
        color: '#333333',
    },
    emptyMessage: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
        color: '#999999',
    },
});

export default TaskList;
