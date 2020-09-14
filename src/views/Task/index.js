import React, { useState } from 'react';
import { 
    View, 
    Text,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Switch,
    Alert
} from 'react-native';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from '../Task/style';
import DateTimeInput from '../../components/DateTimeInput';

import typeIcons from '../../utils/typeIcons';

import api from '../../services/api';

export default function Task({navigation}) {
    const [done, setDone] = useState(false);
    const [type, setType] = useState();
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [hour, setHour] = useState();
    const [macaddress, setMacaddress] = useState('11:11:11:11:11:11');

    async function SaveTask() {
        if (!title)
            return Alert.alert('Defina o nome do título da tarefa!');

        if (!description)
            return Alert.alert('Defina os detalhes da tarefa!');

        if (!type)
            return Alert.alert('Defina o tipo da tarefa!');     
            
        await api.post('/task', {
            macaddress,
            type,
            title,
            description,
            when: `${date}T${hour}.000`    
        }).then(() => {
            navigation.navigate('Home');
        });
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
            <Header showBack={true} navigation={navigation} />
            <ScrollView style={{width: '100%'}}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{marginVertical: 10}}>
                    {
                        typeIcons.map((icon, index) => 
                            icon != null &&
                            <TouchableOpacity onPress={() => setType(index)}>
                                <Image source={icon} style={[styles.imageIcon, type && type != index && styles.typeIconInactive]} />
                            </TouchableOpacity>
                        )
                    }
                </ScrollView>

                <Text style={styles.label}>Título</Text>
                <TextInput 
                    style={styles.input} 
                    maxLength={30} 
                    placeholder='Lembre-me de fazer...'
                    onChange={(text) => setTitle(text)} 
                    value={title}
                />

                <Text style={styles.label}>Detalhes</Text>
                <TextInput 
                    style={styles.inputarea} 
                    maxLength={200} 
                    multiline={true}
                    placeholder='Detalhes da atividade que eu tenho que lembrar...' 
                    onChange={(text) => setDescription(text)} 
                    value={description}                    
                />

                <DateTimeInput type={'date'} save={setDate} date={date} />
                <DateTimeInput type={'hour'} save={setHour} hour={hour} />                

                <View style={styles.inLine}>
                    <View style={styles.inputInLine}>
                        <Switch onValueChange={() => setDone(!done)} value={done} thumbColor={done ? '#00761B' : '#EE6B26'} />
                        <Text style={styles.switchLabel}>Concluído</Text>
                    </View>                        
                    <TouchableOpacity>
                        <Text style={styles.removeLabel}>EXCLUIR</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Footer onPress={SaveTask} />
        </KeyboardAvoidingView>
    )
}