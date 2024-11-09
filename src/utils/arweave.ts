import Arweave from 'arweave';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https'
});

export const saveScore = async (score: number, wallet: any) => {
  try {
    const tx = await arweave.createTransaction({
      data: JSON.stringify({ score, timestamp: Date.now() })
    });

    await arweave.transactions.sign(tx, wallet);
    await arweave.transactions.post(tx);

    return tx.id;
  } catch (error) {
    console.error('Error saving score:', error);
    throw error;
  }
};

export const getHighScores = async () => {
  try {
    const query = `
      query {
        transactions(
          tags: [
            { name: "Content-Type", values: ["application/json"] }
          ]
          first: 10
        ) {
          edges {
            node {
              id
              data {
                size
              }
            }
          }
        }
      }
    `;

    const response = await arweave.api.post('graphql', { query });
    return response.data.data.transactions.edges;
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw error;
  }
};