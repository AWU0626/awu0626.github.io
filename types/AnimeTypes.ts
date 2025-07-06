export type Anime = {
    id: number,
    title: string,
    mediumCover: string,
    largeCover: string,

}

export type MalAnimeResult = {
    node: {
        id: number,
        title: string,
        main_picture: { medium: string, large: string }
    },
    list_status: {
        status: string,
        score: number,
        num_episodes_watched: number,
        is_rewatching: boolean,
        updated_at: string,
    }
}