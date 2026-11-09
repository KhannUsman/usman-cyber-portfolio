const kf = (id, position, value) => ({ id, position, connectedRight: true, connectedLeft: true, handles: [0.5, 1, 0.5, 0], type: 'bezier', value });
const track = (name, a, b) => ({ type: 'BasicKeyframedTrack', __debugName: `Portrait:${name}`, keyframes: [kf(`${name}0`, 0, a), kf(`${name}1`, 1.4, b)] });
export const INTRO_STATE = {
  sheetsById: { Hero: { staticOverrides: { byObject: {} }, sequence: { subUnitsPerUnit: 30, length: 1.6, type: 'PositionalSequence', tracksByObject: { Portrait: { trackData: { t1: track('opacity', 0, 1), t2: track('scale', 0.82, 1), t3: track('rotate', -8, 0) }, trackIdByPropPath: { '["opacity"]': 't1', '["scale"]': 't2', '["rotate"]': 't3' } } } } } },
  definitionVersion: '0.4.0', revisionHistory: [],
};
