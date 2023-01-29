/// export seasons types
export type SeasonId = keyof typeof PodcastSeasons;

export const PodcastSeasons = {
    'season-1': {
        name: 'Temporada 1',
        startDate: null,
        endDate: new Date(2021, 3, 23),
    },
    'season-2': {
        name: 'Temporada 2',
        startDate: new Date(2021, 4, 1),
        endDate: new Date(2022, 0, 20),
    },
    'season-3': {
        name: 'Temporada 3',
        startDate: new Date(2022, 0, 20),
        endDate: new Date(2022, 5, 23),
    },
    'season-4': {
        name: 'Temporada 4',
        startDate: new Date(2022, 5, 24),
        endDate: null,
    },
} as const;

export const podcastSeasonsIds = Object.keys(PodcastSeasons) as Array<SeasonId>;

export const lastPodcastSeason: SeasonId = podcastSeasonsIds[podcastSeasonsIds.length - 1];

export const seasonsIdsWithNames = Object
    .entries(PodcastSeasons)
    .map(([key, { name }]) => ({ key, name })) as Array<{ key: SeasonId, name: string }>;
