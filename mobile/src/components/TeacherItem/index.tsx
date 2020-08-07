import React from 'react';
import { View, Image, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

import heartOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';

function TeacherItem() {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Image
                    style={styles.avatar}
                    source={{ uri: 'https://avatars1.githubusercontent.com/u/66310990?s=460&v=4'}}
                />

                <View style={styles.profileInfo}>
                    <Text style={styles.name}>David</Text>
                    <Text style={styles.subject}>Física</Text>
                </View>
            </View>

            <Text style={styles.bio}>
                Temp Text
                {'\n'}{'\n'}
                Temp text2
            </Text>

            <View style={styles.footer}>
                <Text style={styles.price}>
                    Preço/hora {'   '}
                    <Text style={styles.priceValue}>€5</Text>
                </Text>

                <View style={styles.buttonsContainer}>
                    <RectButton style={[styles.favoriteButton, styles.favorited]}>
                        {/* <Image source={heartOutlineIcon} /> */}
                        <Image source={unfavoriteIcon} />
                    </RectButton>

                    <RectButton style={styles.contactButton}>
                        <Image source={whatsappIcon} />
                        <Text style={styles.contactButtonText}>Entrar em contacto</Text>
                    </RectButton>
                </View>
            </View>
        </View>
    );
}

export default TeacherItem;