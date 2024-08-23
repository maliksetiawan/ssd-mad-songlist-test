import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button, Alert } from 'react-native';
import { getProjects, deleteProject } from '../services/ApiService';

const ProjectScreen = ({ navigation }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function fetchProjects() {
            try {
                const response = await getProjects();
                setProjects(response.data);
            } catch (error) {
                console.error('Error fetching projects:', error);
            }
        }
        fetchProjects();
    }, []);

    const handleDeleteProject = async (projectId) => {
        try {
            await deleteProject(projectId);
            setProjects(projects.filter(project => project.id !== projectId));
            // Tampilkan notifikasi jika berhasil
            Alert.alert('Success', 'Project deleted successfully');
        } catch (error) {
            console.error('Error deleting project:', error);
            Alert.alert('Error', 'Failed to delete the project');
        }
    };

    return (
        <View style={styles.container}>
            <Button title="Add Project" onPress={() => navigation.navigate('EditProject', { projectId: null })} />
            <FlatList
                data={projects}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.projectItemContainer}>
                        <TouchableOpacity
                            style={styles.projectItem}
                            onPress={() => navigation.navigate('ProjectDetail', { projectId: item.id })}
                        >
                            <Text style={styles.projectTitle}>{item.title}</Text>
                        </TouchableOpacity>
                        <View style={styles.buttonContainer}>
                            <Button 
                                title="Edit" 
                                onPress={() => navigation.navigate('EditProject', { projectId: item.id })} 
                            />
                            <View style={styles.buttonSpacer} />
                            <Button 
                                title="Delete" 
                                onPress={() => handleDeleteProject(item.id)} 
                                color="red"
                            />
                        </View>
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
    projectItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    projectItem: {
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
    projectTitle: {
        fontSize: 16,
        color: '#333333',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonSpacer: {
        width: 10, 
    },
});

export default ProjectScreen;
