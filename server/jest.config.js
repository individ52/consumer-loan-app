export default {
    testMatch: ["**/**/*.test.cjs"],
    testEnvironment: "node",
    verbose: true,
    forceExit: true,
    clearMocks: true,
    resetMocks: true,
    restoreMocks: true,
    setupFiles: ["./test/setup-test.cjs"],
    globals: {
        DB_URL: 123,
    },
};
