import React from 'react';
import { Modal, View, StyleSheet, Button } from 'react-native';
import { WebView } from 'react-native-webview';

interface InAppBrowserProps {
  url: string;
  visible: boolean;
  onClose: () => void;
}

const InAppBrowser: React.FC<InAppBrowserProps> = ({ url, visible, onClose }) => {
  return (
    <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Button title="Close" onPress={onClose} color="#6200ee" />
        </View>
        <WebView source={{ uri: url }} style={styles.webView} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 50,
    backgroundColor: '#6200ee',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  webView: {
    flex: 1,
  },
});

export default InAppBrowser;
