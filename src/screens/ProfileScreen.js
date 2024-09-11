//src/screens/ProfileScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

const ProfileScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');

    const handleNameChange = (text) => {
        setName(text);
    };

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handleBioChange = (text) => {
        setBio(text);
    };

    const handleSubmit = () => {
        // Perform any necessary actions with the updated profile data
        console.log('Name:', name);
        console.log('Email:', email);
        console.log('Bio:', bio);
    };

    return (
        <View>
            <Text>Profile Settings</Text>
            <TextInput
                label="Name"
                value={name}
                onChangeText={handleNameChange}
            />
            <TextInput
                label="Email"
                value={email}
                onChangeText={handleEmailChange}
            />
            <TextInput
                label="Bio"
                value={bio}
                onChangeText={handleBioChange}
                multiline
            />
            <Button title="Save" onPress={handleSubmit} />
        </View>
    );
};

export default ProfileScreen;
