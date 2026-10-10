import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const chatName = params.name || 'Chat';

  const [messages, setMessages] = useState([
    { id: '1', sender: 'them', text: 'Hi Ozair, I saw your proposal for the project.', time: '10:30 AM' },
    { id: '2', sender: 'me', text: 'Hello! Yes, I am very interested and have built similar apps before.', time: '10:32 AM' },
    { id: '3', sender: 'them', text: 'Looks great! Can we adjust the milestone delivery?', time: '10:45 AM' },
  ]);

  const [inputText, setInputText] = useState('');

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      sender: 'me',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setInputText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{chatName}</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined} 
        style={{ flex: 1 }}
      >
        {/* Messages List */}
        <ScrollView contentContainerStyle={styles.chatScroll} ref={(ref) => ref?.scrollToEnd({ animated: true })}>
          {messages.map((msg) => {
            const isMe = msg.sender === 'me';
            return (
              <View key={msg.id} style={[styles.msgRow, isMe ? styles.myMsgRow : styles.theirMsgRow]}>
                <View style={[styles.bubble, isMe ? styles.myBubble : styles.theirBubble]}>
                  <Text style={[styles.msgText, isMe ? styles.myMsgText : styles.theirMsgText]}>{msg.text}</Text>
                  <Text style={[styles.timeText, isMe ? styles.myTimeText : styles.theirTimeText]}>{msg.time}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Type a message..."
            placeholderTextColor="#777"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#1E1E1E' },
  backText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  chatScroll: { padding: 16 },
  msgRow: { marginBottom: 12, flexDirection: 'row' },
  myMsgRow: { justifyContent: 'flex-end' },
  theirMsgRow: { justifyContent: 'flex-start' },
  bubble: { maxWidth: '75%', padding: 12, borderRadius: 14 },
  myBubble: { backgroundColor: '#007AFF', borderBottomRightRadius: 2 },
  theirBubble: { backgroundColor: '#1E1E1E', borderBottomLeftRadius: 2, borderWidth: 1, borderColor: '#2A2A2A' },
  msgText: { fontSize: 14 },
  myMsgText: { color: '#fff' },
  theirMsgText: { color: '#ddd' },
  timeText: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
  myTimeText: { color: 'rgba(255,255,255,0.7)' },
  theirTimeText: { color: '#777' },
  inputContainer: { flexDirection: 'row', padding: 12, backgroundColor: '#1E1E1E', alignItems: 'center', borderTopWidth: 1, borderTopColor: '#2A2A2A' },
  textInput: { flex: 1, backgroundColor: '#121212', color: '#fff', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#2A2A2A', marginRight: 10, fontSize: 14 },
  sendButton: { backgroundColor: '#007AFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20 },
  sendButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 14 }
});