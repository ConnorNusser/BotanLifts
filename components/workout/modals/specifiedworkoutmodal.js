export const SpecifiedWorkoutModal = ({exerciseModalVisible, handleCloseModal, selectedExercise, dayOfWeek, handleCloseModal, windowHeight}) => {
    return (
      <Modal visible={exerciseModalVisible} animationType="slide" transparent={true}>
          <TouchableOpacity style={styles.modalBackground} onPress={handleCloseModal}>
            <View style={styles.modalContainer}>
                <SpecifiedWorkout
                  exercise={selectedExercise}
                  dow={dayOfWeek}
                  onClose={handleCloseModal} // Close the modal on SpecifiedWorkout's close action
                />
            </View>
          </TouchableOpacity>
        </Modal>
    )
}


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
      height: windowHeight * 0.8, // Take 80% of the screen's height
      backgroundColor: 'white',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      overflow: 'hidden',
    },
});