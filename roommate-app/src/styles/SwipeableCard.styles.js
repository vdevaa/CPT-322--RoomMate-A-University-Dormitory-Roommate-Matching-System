import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH - 40,
    height: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  overlay: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    borderRadius: 20,
  },
  likeOverlay: {
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
  },
  nopeOverlay: {
    backgroundColor: 'rgba(244, 67, 54, 0.8)',
  },
  overlayText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 4,
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#E34234',
    marginBottom: 4,
  },
  details: {
    fontSize: 16,
    color: '#666',
  },
  bioSection: {
    marginBottom: 20,
  },
  bio: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  traitsSection: {
    marginBottom: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  trait: {
    width: '50%',
    marginBottom: 12,
  },
  traitLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  traitValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  hobbiesSection: {
    marginBottom: 20,
  },
  hobbiesLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hobbyTag: {
    backgroundColor: '#fde6e2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  hobbyText: {
    color: '#E34234',
    fontSize: 14,
    fontWeight: '500',
  },
  preferencesSection: {
    marginTop: 'auto',
  },
  preferencesLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  preferencesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  preferenceItem: {
    fontSize: 14,
    color: '#666',
    marginRight: 16,
    marginBottom: 4,
  },
});

export default styles;
