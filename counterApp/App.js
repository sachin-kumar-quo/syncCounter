import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default App = () => {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const socket = io('http://192.168.0.105:5000');
  useEffect(() => {
    socket.emit('connected1');
  }, []);

  const sendStart = () => {
    console.log('hello');
    socket.emit('start', start);
  };
  const sendStop = () => {
    console.log('hello');
    socket.emit('stop', start);
  };
  const sendReset = () => {
    console.log('hello');
    socket.emit('reset', start);
  };
  socket.on('server', msg => {
    console.log(msg);
  });

  socket.on('timechange', time => {
    setCount(time);
  });
  socket.on('onConnection', time => {
    setCount(time);
  });
  socket.on('onReset', time => {
    setCount(time);
  });

  return (
    <View style={styles.myview}>
      <Text>{count}</Text>
      <TouchableOpacity onPress={sendStart}>
        <Text>socket start</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={sendStop}>
        <Text>socket stop</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={sendReset}>
        <Text>socket reset</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  myview: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
