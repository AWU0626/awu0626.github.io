import { Card, Layout, Row, Col } from "antd";
import { Content } from "antd/es/layout/layout";
import { useEffect, useState } from "react";

// server calling
import axios from "axios";
import type { Anime, MalAnimeResult } from "../../types/AnimeTypes"
import Meta from "antd/es/card/Meta";

function Anime() {
    const [animeList, setAnimeList] = useState<Anime[]>([]);

    async function getTopAnime(malClientId: string, user?: string, limit?: number) {
        if (!malClientId) throw new Error('invalid or no malClientId passed in from getTopAnime()')
        try {
            const url = `https://fi33pdj3wujpi4ycfvwkazbuye0ppmdi.lambda-url.us-east-2.on.aws/`
            const response = await axios(url, {
                params: {
                    malClientId: malClientId,
                    user: user,
                    limit: limit
                }
            })

            return response.data.animelist
        } catch (error) {
            console.log('error fetching anime list due to:', error)
            return []
        }
    }

    useEffect(() => {
        const malClientId = '040558321523c7cac6e3635297349cc4';

        getTopAnime(malClientId, '', 9)
        .then(animeList => {
            // type safe from mal result into anime object
            const transformedAnimeList = (result: MalAnimeResult[]): Anime[] => {
                return result.map((anime) => ({
                    id: anime.node.id, // Use `node.id` for MyAnimeList API v2
                    title: anime.node.title,
                    mediumCover: anime.node.main_picture.medium,
                    largeCover: anime.node.main_picture.large,
                }));
            }

            setAnimeList(transformedAnimeList(animeList))
        }).catch((error) => {
            console.error(error)
        })
    }, [])

    return (
        <Layout>
            <Content style={{overflowY: 'auto', height: '100vh'}}>
                <Row gutter={[36, 36]} style={{paddingBottom: 150}}>
                    {animeList.map((anime) => (
                        <Col key={anime.id} xs={36} sm={24} md={12} lg={6}>
                        <Card
                            hoverable
                            style={{ width: 325 }} // Full width of the column
                            cover={<img alt={anime.title} src={anime.largeCover} width={350} height={475}/>}
                            onClick={() => console.log(anime.title)}
                            type="inner"
                        >
                            <Meta title={anime.title} description="MyAnimeList" />
                        </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    )
}

export default Anime;