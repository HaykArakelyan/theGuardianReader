import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SingleNewsModel } from '../Models/SingleNewsModel';
import { Utils } from '../Services/Utils';
import Icon from 'react-native-vector-icons/FontAwesome';
import { StorageService } from '../Services/StorageService';

interface Props {
    singleNews: SingleNewsModel,
}

const SingleNewsCardComponent: React.FC<Props> = ({ singleNews }) => {
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
        StorageService.isSaved(singleNews.id)
            .then(saved => setIsSaved(saved))
            .catch(err => {
                console.log(err)
                setIsSaved(false)
            })

    }, [])

    const test = () => {
        StorageService.getKeys()
            .then(keys => console.log('Stored keys:', keys))
            .catch(err => console.error('Error getting keys:', err));
    };

    const handleDownloadPress = () => {
        if (!isSaved) {
            StorageService.save(singleNews)
            setIsSaved(true)
        } else {
            StorageService.delete(singleNews.id)
            setIsSaved(false)
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={test}>

            <View style={styles.newsImageContainer}>
                {singleNews.elements && (
                    <Image source={{ uri: singleNews.elements[0].assets[0].file }} style={styles.newsImage} />
                )}
            </View>
            <View style={styles.newsDetails}>
                <View>
                    <Text
                        style={styles.newsTitle}
                        ellipsizeMode='tail'
                        numberOfLines={1}
                    >
                        {singleNews.webTitle}
                    </Text>
                </View>

                <View style={styles.newsBodyContainer}>
                    {singleNews?.fields?.bodyText && (
                        <Text
                            style={styles.newsBody}
                            numberOfLines={3}
                            ellipsizeMode='tail'
                        >
                            {singleNews.fields.bodyText}
                        </Text>
                    )}
                </View>

                <View>
                    <Text style={styles.newsPublicationDate}>
                        {Utils.formatDate(singleNews.webPublicationDate)}
                    </Text>
                </View>
            </View>
            <View style={styles.downloadButtonContainer}>
                <TouchableOpacity onPress={handleDownloadPress}>
                    <Icon
                        name={isSaved ? "check" : "download"}
                        color="black"
                        style={styles.downloadButtonIcon}
                        size={20}
                    />
                </TouchableOpacity>
            </View>
        </TouchableOpacity >
    );
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderRadius: 16,
        padding: 10,
        paddingHorizontal: 5,
        marginBottom: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
    },
    newsImageContainer: {
        marginRight: 10
    },
    newsImage: {
        width: 100,
        height: 100,
        borderRadius: 16,
        resizeMode: "cover",
    },
    newsDetails: {
        display: "flex",
        flexDirection: "column",
        flex: 1
    },
    newsTitle: {
        fontWeight: "bold",
        fontSize: 18
    },
    newsBodyContainer: {
        flexDirection: "row",
        flex: 1,
        flexWrap: "wrap",
    },
    newsBody: {
        flex: 1,
        fontSize: 16,
        flexShrink: 1,
    },
    newsPublicationDate: {
        fontStyle: "italic",
        fontWeight: "600"
    },
    downloadButtonContainer: {
        alignItems: "flex-end",
        paddingHorizontal: 10,
    },
    downloadButtonIcon: {
        backgroundColor: "#D8D8D8",
        borderRadius: 16,
        padding: 5,
    }
});

export default SingleNewsCardComponent;