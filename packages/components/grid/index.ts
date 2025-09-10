import GridItem from './src/grid-item.vue';
import Grid from './src/grid.vue';

export type GridInstance = InstanceType<typeof Grid>;
export type GridItemInstance = InstanceType<typeof GridItem>;
export * from './src/interface';

export { Grid, GridItem };
