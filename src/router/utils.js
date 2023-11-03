export function isAuthenticatedOnlyRedirectRequired(to, user) {
    const authenticatedOnly = to.matched.some((record) => record.meta.authenticatedOnly);
    return authenticatedOnly && !user;
}

export function isGuestsOnlyRedirectRequired(to, user) {
    const guestsOnly = to.matched.some((record) => record.meta.guestsOnly);
    return guestsOnly && user;
}