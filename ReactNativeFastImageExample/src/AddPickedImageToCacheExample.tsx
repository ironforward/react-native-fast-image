import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native'
import FastImage, { FastImageProps } from 'react-native-fast-image'
import Section from './Section'
import SectionFlex from './SectionFlex'
import FeatureText from './FeatureText'
import { useCacheBust } from './useCacheBust'
import BulletText from './BulletText'
import { launchImageLibrary } from 'react-native-image-picker'

const Image = ({ source, ...p }: FastImageProps) => (
    <FastImage
        style={styles.imageSquare}
        source={source}
        {...p}
    />
)

const Row: React.ComponentType<ViewProps> = (p: ViewProps) => (
    <View style={styles.row} {...p} />
)

export const AddPickedImageToCacheExample = () => {
    const { bust } = useCacheBust('')
    const [image, setImage] = useState<{ uri: string } | null>(null)

    useEffect(() => {
        if (!image || !image?.uri) {
            return
        }
        (async () => {
            await FastImage.addFileToCache(image.uri, 'www.google.com')
        })()
    }, [image])

    const pick = useCallback(() => {
        launchImageLibrary({ mediaType: 'photo' }, (response) => {
            if (response.didCancel) {
                console.log('ImagePicker - User cancelled.')
            } else if (response.errorCode) {
                console.log(`ImagePicker - Error ${response.errorMessage}.`)
            } else {
                const uri = response.assets?.[0]?.uri
                if (uri) {
                    setImage({ uri })
                }
            }
        })
    }, [])

    return (
        <View>
            <Section>
                <FeatureText text='• Add local image to cache using its file path.' />
            </Section>
            <SectionFlex onPress={bust}>
                <Row>
                    <BulletText>photo library</BulletText>
                    <TouchableOpacity onPress={pick}>
                        <Image
                            style={styles.imageSquare}
                            source={image || 0}
                        >
                            <Text style={styles.pickPhoto}>Pick Photo</Text>
                        </Image>
                        <Image
                            style={styles.imageSquare}
                            source={image || 0}
                        >
                            <Text style={styles.pickPhoto}>Pick Photo</Text>
                        </Image>
                    </TouchableOpacity>
                </Row>
            </SectionFlex>
        </View>
    )
}

const styles = StyleSheet.create({
    pickPhoto: {
        color: 'white',
        fontWeight: '900',
    },
    row: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    image: {
        flex: 1,
        height: 100,
        backgroundColor: '#ddd',
    },
    imageSquare: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        backgroundColor: '#ddd',
        margin: 20,
        marginTop: 10,
        width: 100,
        flex: 0,
    },
})
