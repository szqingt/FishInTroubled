import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';

function App() {
    const [count, setCount] = useState(0);
    return (
        <View>
            <Text>
                You clicked {count} times
            </Text>
            <Button
                onPress={() => setCount(count + 1)}
                title="Learn More"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
            />
        </View>
    );
}

export default App