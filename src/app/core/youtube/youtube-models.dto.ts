export module YT {
    export interface QueryPlaylist {
        playlistId: string;
        part: 'id' | 'snippet' | 'contentDetails' | 'status';
        maxResults?: number;
        pageToken?: string;
    }

    export interface QueryVideo {
        part: 'id' | 'snippet' | 'contentDetails' | 'status';
    }

    export interface QueryPlaylistResponse {
        kind: 'youtube#playlistItemListResponse';
        etag: any;
        nextPageToken: string;
        prevPageToken: string;
        pageInfo: {
            totalResults: number;
            resultsPerPage: number;
        };
        items: PlaylistItem[];
    }
    export interface QueryVideoResponse {
        kind: string;
        etag: string;
        items: Video[];
    }

    export interface PlaylistItem {
        kind: 'youtube#playlistItem';
        etag: any;
        id: string;
        snippet: {
            publishedAt: string;
            channelId: string;
            title: string;
            description: string;
            thumbnails: {
                [key: string]: {
                    url: string;
                    width: number;
                    height: number;
                };
            };
            channelTitle: string;
            playlistId: string;
            position: number;
            resourceId: {
                kind: string;
                videoId: string;
            };
        };
        contentDetails: {
            videoId: string;
            startAt: string;
            endAt: string;
            note: string;
        };
        status: {
            privacyStatus: string;
        };
    }
    export interface Video {
        kind: 'youtube#video';
        etag: any;
        id: string;
        snippet: {
            categoryId: string;
            liveBroadcastContent: string;
            defaultLanguage: string;
            localized: {
                title: string;
                description: string;
            };
            defaultAudioLanguage: string;

            publishedAt: string;
            channelId: string;
            title: string;
            description: string;
            thumbnails: {
                [key: string]: {
                    url: string;
                    width: number;
                    height: number;
                };
            };
            channelTitle: string;
        };
    }
}