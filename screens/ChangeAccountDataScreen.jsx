import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

//colors
import { Colors } from '@/constants';

//components
import Header from '@/components/Header';
import Form, { validation } from '@/components/Form';

const ChangeAccountDataScreen = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <Header
        title={'Datele mele'}
        variant="3"
        arrowColor="black"
        backButtonSize={24.5}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
        <Form
          initialValues={{
            nume: 'Nastase',
            prenume: 'Alexandru',
            telefon: '0731306547',
            email: 'alex@example.com',
          }}
          onSubmit={(v) => console.log(v)}
        >
          <Form.Field>
            <Form.Label>Nume utilizator (nu se poate schimba)</Form.Label>
            <Form.Input
              name="Nume_utilizator"
              value="Pikolo1515"
              editable={false}
              inputStyle={[styles.input, { color: '#666' }]}
            />
          </Form.Field>
          <Form.Field>
            <Form.Label>Nume</Form.Label>
            <Form.Input
              inputStyle={styles.input}
              name="nume"
              validate={validation.required}
            />
            <Form.Error name={'nume'} />
          </Form.Field>
          <Form.Field>
            <Form.Label>Prenume</Form.Label>
            <Form.Input
              inputStyle={styles.input}
              name="prenume"
              validate={validation.required}
            />
            <Form.Error name={'prenume'} />
          </Form.Field>
          <Form.Field>
            <Form.Label>Telefon</Form.Label>
            <Form.Input
              inputStyle={styles.input}
              name="telefon"
              keyboardType="number-pad"
              validate={validation.phoneNr_required}
            />
            <Form.Error name={'telefon'} />
          </Form.Field>
          <Form.Field>
            <Form.Label>Email</Form.Label>
            <Form.Input
              inputStyle={styles.input}
              name="email"
              keyboardType="email-address"
              validate={validation.email_required}
            />
            <Form.Error name={'email'} />
          </Form.Field>
          <Form.SubmitButton style={{ marginTop: 15 }} title="Actualizeaza contul" />
        </Form>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.light.background.primary,
    alignItems: 'center',
  },

  input: {
    backgroundColor: 'white',
  },
});

export default ChangeAccountDataScreen;
