export const fetchFromIPFS = async (ipfsUrl: string): Promise<string> => {
  const cid = ipfsUrl.replace("ipfs://", "");
  const response = await fetch(`/api/proxy?cid=${cid}`);
  if (!response.ok) {
    throw new Error("Error al obtener contenido desde el proxy");
  }
  return await response.text();
};
