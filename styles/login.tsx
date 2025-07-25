import {
  StyleSheet,
  Dimensions,
} from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: width * 0.05,
  },
  appName: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: height * 0.01,
  },
  appDescription: {
    fontSize: width * 0.04,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  slogan: {
    fontSize: width * 0.04,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: height * 0.05,
    fontWeight: "900"
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: width * 0.05,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: width * 0.06,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  inputLabel: {
    fontSize: width * 0.035,
    color: '#34495e',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
    padding: width * 0.03,
    fontSize: width * 0.04,
  },
  forgotPassword: {
    fontSize: width * 0.035,
    color: '#3498db',
    textAlign: 'right',
    marginBottom: height * 0.03,
  },
  button: {
    backgroundColor: '#e74c3c',
    borderRadius: 5,
    padding: width * 0.035,
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: 'white',
    fontSize: width * 0.045,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: width * 0.035,
    color: '#7f8c8d',
  },
  signupLink: {
    fontSize: width * 0.035,
    color: '#3498db',
    fontWeight: 'bold',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
    borderRadius: 5,
    paddingRight: 10,
  },
  passwordInput: {
    flex: 1,
    padding: width * 0.03,
    fontSize: width * 0.04,
    backgroundColor: 'transparent',
  },
  eyeButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeIcon: {
    fontSize: 18,
    color: '#7f8c8d',
  },
});