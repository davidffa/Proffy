import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';

import styles from './styles';

function Favorites() {
    const [favorites, setFavorites] = useState([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(res => {
            if (res) {
                const favoritedTeachers = JSON.parse(res);

                setFavorites(favoritedTeachers);
            }
        })
    }

    useFocusEffect(
        React.useCallback(() => {
          loadFavorites();
        }, [favorites])
    )
    /*useFocusEffect(() => {
        loadFavorites();
    })*/

    return (
        <View style={styles.container}>
            <PageHeader title="Meus proffys favoritos" />

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {favorites.map((teacher: Teacher) => {
                    return (
                        <TeacherItem 
                            key={teacher.id}
                            teacher={teacher}
                            favorited
                        />
                    );
                })}
               
            </ScrollView> 
        </View>
    );
}

export default Favorites;