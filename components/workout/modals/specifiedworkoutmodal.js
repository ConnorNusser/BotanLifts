import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import SpecifiedWorkout from './specifiedworkout';

export const SpecifiedWorkoutModal = ({
  id,
  visible,
  selectedExercise,
  dow,
  onClose,
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <TouchableOpacity style={styles.modalBackground} onPress={onClose}>
        <View style={styles.modalContainer}>
          <SpecifiedWorkout
            id = {id}
            exercise={selectedExercise}
            dow={dow}
            onClose={onClose} // Close the modal on SpecifiedWorkout's close action
          />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    // Your container styles
  },
  buttonRow: {
    // Your button row styles
  },
  card: {
    // Your card styles
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end', // Align to the bottom
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
