function generateRandomLocation() {
    return [(Math.random() * (munichBBox[1][1] - munichBBox[0][1]) + munichBBox[0][1]),
        (Math.random() * (munichBBox[1][0] - munichBBox[0][0]) + munichBBox[0][0])]
}
