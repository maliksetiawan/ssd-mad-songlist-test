import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getProjectDetails, getTasks } from '../services/ApiService';

const ProjectDetail = ({ route }) => {
    const { projectId } = route.params;
    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchProjectDetails() {
            try {
                const projectResponse = await getProjectDetails(projectId);
                setProject(projectResponse.data);
    
                const tasksResponse = await getTasks(projectId);
                setTasks(tasksResponse.data);
            } catch (error) {
                console.error('Error fetching project details:', error);
                // Tambahkan pesan error kepada pengguna di sini, misalnya:
                setProject({ error: 'Failed to load project details. Please try again later.' });
            }
        }
        fetchProjectDetails();
    }, [projectId]);
    
    if (!project) {
        return <Text>Loading project details...</Text>;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.projectTitle}>{project.title}</Text>
            <Text style={styles.projectDescription}>{project.description}</Text>

            <Text style={styles.sectionTitle}>Tasks</Text>
            <FlatList
                data={tasks}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                        <Text>{item.name || item.title}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    projectTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    projectDescription: {
        marginVertical: 10,
        fontSize: 16,
        color: '#666',
    },
    sectionTitle: {
        marginTop: 20,
        fontSize: 18,
        fontWeight: 'bold',
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
});

export default ProjectDetail;
