import React from 'react';
import { View, Text } from 'react-native';

const TaskDetail = ({ route }) => {
    const { task } = route.params;

    return (
        <View>
            <Text>Title: {task.title}</Text>
            <Text>Priority: {task.priority}</Text>
            <Text>Deadline: {task.deadline}</Text>
            <Text>Status: {task.complete ? 'Complete' : 'Incomplete'}</Text>
        </View>
    );
};

export default TaskDetail;
