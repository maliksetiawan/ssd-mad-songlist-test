import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { getProjects } from '../services/ApiService';

const ProjectList = ({ navigation }) => {
    const [projects, setProjects] = React.useState([]);

    React.useEffect(() => {
        async function fetchProjects() {
            const data = await getProjects();
            setProjects(data);
        }
        fetchProjects();
    }, []);

    return (
        <View>
            <FlatList
                data={projects}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <Text onPress={() => navigation.navigate('ProjectDetail', { projectId: item.id })}>
                        {item.title}
                    </Text>
                )}
            />
        </View>
    );
};

export default ProjectList;
