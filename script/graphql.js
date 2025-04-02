// graphql.js - Compatible version for browser Phaser game (no ES modules)

// Replace this with your actual GraphQL backend endpoint
const GRAPHQL_ENDPOINT = 'https://your-api-endpoint.com/graphql';

/**
 * Sends a GraphQL query to the endpoint.
 * @param {string} query - The GraphQL query string.
 * @param {object} variables - Optional variables for the query.
 * @returns {Promise<object|null>} - The data returned by the query or null on error.
 */
window.queryGraphQL = async function(query, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables })
    });

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Query Errors:', result.errors);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('GraphQL Query Error:', error);
    return null;
  }
};

/**
 * Sends a GraphQL mutation to the endpoint.
 * @param {string} mutation - The GraphQL mutation string.
 * @param {object} variables - Optional variables for the mutation.
 * @returns {Promise<object|null>} - The data returned by the mutation or null on error.
 */
window.mutateGraphQL = async function(mutation, variables = {}) {
  try {
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: mutation, variables })
    });

    const result = await response.json();

    if (result.errors) {
      console.error('GraphQL Mutation Errors:', result.errors);
      return null;
    }

    return result.data;
  } catch (error) {
    console.error('GraphQL Mutation Error:', error);
    return null;
  }
};

// Optional: You can define additional GraphQL helper functions here for future use
/*
window.getPlayerStats = async function(playerId) {
  const query = `
    query GetPlayerStats($id: ID!) {
      player(id: $id) {
        name
        level
        progress
      }
    }
  `;
  return await queryGraphQL(query, { id: playerId });
};
*/



