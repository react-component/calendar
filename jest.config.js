module.exports = {
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
  extraSetupFiles: ['./tests/setup.js'],
};
