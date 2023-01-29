export const VisibilizacionSeasons = {
    'primera-temporada': { name: 'Abril - Agosto 2022', playlistId: 'PLFPtt_hNbelsROZoxJ53H7dAHJoVGvk7R' },
} as const;

/// export seasons types
export type SeasonId = keyof typeof VisibilizacionSeasons;

export const visibilizacionSeasonsIds = Object.keys(VisibilizacionSeasons) as Array<SeasonId>;

export const lastVisibilizacionSeasonId: SeasonId = visibilizacionSeasonsIds[visibilizacionSeasonsIds.length - 1];

export const seasonsIdsWithNames = Object
    .entries(VisibilizacionSeasons)
    .map(([id, { name, playlistId }]) => ({ id, name, playlistId })) as Array<{ id: SeasonId, name: string, playlistId: string }>;
