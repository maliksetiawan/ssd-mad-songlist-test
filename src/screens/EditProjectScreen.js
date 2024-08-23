import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { getProjectDetails, updateProject } from '../services/ApiService';

const EditProjectScreen = ({ route, navigation }) => {
    const { projectId } = route.params;
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    useEffect(() => {
        async function fetchProjectDetails() {
            try {
                const response = await getProjectDetails(projectId);
                setTitle(response.data.title);
                setBody(response.data.body);
            } catch (error) {
                console.error('Error fetching project details:', error);
                Alert.alert('Error', 'Failed to fetch project details');
            }
        }
        fetchProjectDetails();
    }, [projectId]);

    const handleUpdateProject = async () => {
        const updatedProject = {
            title: title,
            body: body,
            userId: 1, 
        };
        try {
            await updateProject(projectId, updatedProject);
            Alert.alert('Success', 'Project updated successfully');
            navigation.goBack();
        } catch (error) {
            console.error('Error updating project:', error);
            Alert.alert('Error', 'Failed to update the project');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Project Title</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
            />
            <Text style={styles.label}>Project Body</Text>
            <TextInput
                style={styles.input}
                value={body}
                onChangeText={setBody}
            />
            <Button title="Update Project" onPress={handleUpdateProject} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});

export default EditProjectScreen;
