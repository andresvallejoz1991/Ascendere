export const WebinarsSeasons = {
    'primera-temporada': { name: 'Primera Temporada', playlistId: 'PLFPtt_hNbeltdu4vVBUw_C-5MnZ7qbrJA' },
    'segunda-temporada': { name: 'Segunda Temporada', playlistId: 'PLFPtt_hNbeluoa-u-ix40qgASAdN493l3' },
    'tercera-temporada': { name: 'Tercera Temporada', playlistId: 'PLFPtt_hNbeltLbUUvyo3OJYg_WWBeSA3z' },
    'webinars-iiped': { name: 'Webinars IIPED', playlistId: 'PLFPtt_hNbelsOGXQoXE0T-fyOzxowMZuk' },
    'cuarta-temporada': { name: 'Cuarta Temporada', playlistId: 'PLFPtt_hNbeluX7-IMLkSRKrf7GLzqALWI' },
} as const;

/// export seasons types
export type SeasonId = keyof typeof WebinarsSeasons;

export const webinarsSeasonsIds = Object.keys(WebinarsSeasons) as Array<SeasonId>;

export const lastWebinarSeasonId: SeasonId = webinarsSeasonsIds[webinarsSeasonsIds.length - 1];

export const seasonsIdsWithNames = Object
    .entries(WebinarsSeasons)
    .map(([id, { name, playlistId }]) => ({ id, name, playlistId })) as Array<{ id: SeasonId, name: string, playlistId: string }>;
