import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants';

//components
import Header from '@/components/Header';
import Form, { validation } from '@/components/Form';

const ChangePasswordScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={'Schimba parola'}
        variant="3"
        arrowColor="black"
        backButtonSize={24.5}
      />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Form
          initialValues={{
            parola_curenta: '',
            padrola_noua: '',
          }}
          onSubmit={(v) => console.log(v)}
        >
          <Form.Field>
            <Form.Label>Parola curenta</Form.Label>
            <Form.Input
              name="parola_curenta"
              inputStyle={[styles.input]}
              validate={validation.required}
            />
            <Form.Error name={'parola_curenta'} />
          </Form.Field>
          <Form.Field>
            <Form.Label>Parola noua</Form.Label>
            <Form.Input
              name="parola_noua"
              inputStyle={styles.input}
              validate={validation.required}
            />
            <Form.Error name={'parola_noua'} />
          </Form.Field>

          <Form.SubmitButton style={{ marginTop: 15 }} title="Actualizeaza parola" />
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background.primary,
  },
});

export default ChangePasswordScreen;
