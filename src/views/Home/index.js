import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';

import styles from './styles';

// COMPONENTES

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import TaskCard from '../../components/TaskCard';

// API
import api from '../../services/api';

export default function Home() {

    const [filter, setFilter] = useState('today');
    const [tasks, setTasks] = useState([]);
    const [load, setLoad] = useState(false);

    async function loadTasks() {
        setLoad(true);
        await api.get(`/task/filter/${filter}/11:11:11:11:11:11`)
                 .then(response => {
                    setTasks(response.data)
                    setLoad(false);
                 });
    }

    useEffect(() => {
        loadTasks();
    }, [filter]);

    return(
        <View style={styles.container}>
            <Header showNotification={true} showBack={false} />
            
            <View style={styles.filter}>
                <TouchableOpacity onPress={() => setFilter('all')}>
                    <Text style={filter == 'all' ? styles.filterTextActived : styles.filterTextInactived}>Todos</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFilter('today')}>
                <Text style={filter == 'today' ? styles.filterTextActived : styles.filterTextInactived}>Hoje</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFilter('week')}>
                <Text style={filter == 'week' ? styles.filterTextActived : styles.filterTextInactived}>Semana</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFilter('month')}>
                <Text style={filter == 'month' ? styles.filterTextActived : styles.filterTextInactived}>Mês</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setFilter('year')}>
                <Text style={filter == 'year' ? styles.filterTextActived : styles.filterTextInactived}>Ano</Text>
                </TouchableOpacity>                                                
            </View>

            <View style={styles.title}>
                <Text style={styles.titleText}>TAREFAS</Text>
            </View>

            <ScrollView style={styles.content} contentContainerStyle={{alignItems: 'center'}}>
                    {
                        load 
                        ? 
                        <ActivityIndicator color={'#EE6B26'} size={50} /> 
                        :                        
                        tasks.map(t => (
                            <TaskCard done={false} title={t.title} when={t.when} type={t.type} />
                        ))
                    }
            </ScrollView>

            <Footer icon={'add'} />
        </View>
    );
}