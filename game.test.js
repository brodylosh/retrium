const {
  BLOCK_BOARD,
  BLINKER_BOARD,
  BLINKER_GEN_TWO_BOARD,
  EDGE_OSCILLATOR_BOARD,
  EDGE_GEN_TWO_BOARD,
  DEAD_BOARD,
  getNextGeneration,
} = require('./game');

// If you want to use Jest for unit testing, add some tests to this file
describe('Game of Life - getNextGeneration', () => {
  it('a still life should not change across multiple generations', () => {
    const generationOne = BLOCK_BOARD;
    const generationTwo = getNextGeneration(generationOne);
    const generationThree = getNextGeneration(generationTwo);

    expect(generationOne).toEqual(generationTwo);
    expect(generationTwo).toEqual(generationThree);
    expect(generationThree).toEqual(BLOCK_BOARD);
  });
  it('a vertical or horizontal oscillator should toggle to the opposite state', () => {
    const generationOne = BLINKER_BOARD;
    const generationTwo = getNextGeneration(generationOne);
    const generationThree = getNextGeneration(generationTwo);

    expect(generationOne).toEqual(generationThree);
    expect(generationTwo).toEqual(BLINKER_GEN_TWO_BOARD);
  });
  it('a three-cell oscillator on the edge should die after two generations', () => {
    const generationOne = EDGE_OSCILLATOR_BOARD;
    const generationTwo = getNextGeneration(generationOne);
    const generationThree = getNextGeneration(generationTwo);

    expect(generationTwo).toEqual(EDGE_GEN_TWO_BOARD);
    expect(generationThree).toEqual(DEAD_BOARD);
  });
});
