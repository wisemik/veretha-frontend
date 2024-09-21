import { SignProtocolClient, SpMode, EvmChains } from "@ethsign/sp-sdk";
import { privateKeyToAccount } from "viem/accounts";
import { decodeAbiParameters } from "viem";

// Updated createNotaryAttestation function to use client.createAttestation
async function createNotaryAttestation(client, contractDetails, signer) {
  try {
    const res = await client.createAttestation({
      schemaId: "0x2c1", // Use your schema ID here
      data: {
        contractDetails,
        signer,
      },
      indexingValue: signer.toLowerCase(),
    });

    console.log("Attestation created:", res);
  } catch (error) {
    console.log("Error creating attestation:", error?.message || error);
  }
}

async function findAttestation(attestations) {
  for (const att of attestations) {
    if (!att.data) continue;

    let parsedData;
    if (att.mode === "onchain") {
      try {
        const data = decodeAbiParameters(
          [att.dataLocation === "onchain" ? { components: att.schema.data, type: "tuple" } : { type: "string" }],
          att.data
        );
        parsedData = data[0];
      } catch (error) {
        try {
          const data = decodeAbiParameters(
            att.dataLocation === "onchain" ? att.schema.data : [{ type: "string" }],
            att.data
          );
          const obj = {};
          data.forEach((item, i) => {
            obj[att.schema.data[i].name] = item;
          });
          parsedData = obj;
        } catch (error) {
          continue;
        }
      }
    } else {
      try {
        parsedData = JSON.parse(att.data);
      } catch (error) {
        console.log(error);
        continue;
      }
    }
    return { parsedData };
  }
  return undefined;
}

async function makeAttestationRequest(endpoint, options) {
  const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(JSON.stringify(response));
  }

  return response.json();
}

async function queryAttestations(aliceAddress, bobAddress) {
  try {
    const response = await makeAttestationRequest("index/attestations", {
      method: "GET",
      params: {
        mode: "onchain",
        schemaId: "onchain_evm_84532_0x2c1",
        attester: aliceAddress,
        indexingValue: bobAddress.toLowerCase(),
      },
    });

    if (!response.success) {
      console.error("Attestation query failed:", response?.message);
      return;
    }

    if (response.data?.total === 0) {
      console.log("No attestations found for this address.");
      return;
    }

    console.log("Attestations found:", response.data.rows);
    return response.data.rows;
  } catch (error) {
    console.error("Error querying attestations:", error.message);
  }
}

export default {
  async createSchema() {
    const privateKey = process.env.VUE_APP_PRIVATE_KEY;
    try {
      const client = new SignProtocolClient(SpMode.OnChain, {
        chain: EvmChains.baseSepolia,
        account: privateKeyToAccount(privateKey),
      });

      const res = await client.createSchema({
        name: "SDK Test",
        data: [
          { name: "contractDetails", type: "string" },
          { name: "signer", type: "address" },
        ],
      });

      console.log("Schema created:", res);
    } catch (error) {
      console.error("Error creating schema:", error);
    }
  },
  async attest(bobAddress) {
    const contractDetails = "Some cv info";
    const privateKey = process.env.VUE_APP_PRIVATE_KEY;
    const signer = bobAddress;
    const client = new SignProtocolClient(SpMode.OnChain, {
      chain: EvmChains.baseSepolia,
      account: privateKeyToAccount(privateKey),
    });

    await createNotaryAttestation(client, contractDetails, signer);
  },
  async checkAttestations(bobAddress) {
    if (bobAddress) {
      await queryAttestations(bobAddress);
    } else {
      console.log("Please enter Bob's address to check attestations.");
    }
  },
  async showParsedData(bobAddress) {
    if (bobAddress) {
      const attestations = await queryAttestations(bobAddress);
      const contractText = await findAttestation(attestations);
      if (contractText && contractText.parsedData && contractText.parsedData.contractDetails) {
        alert(JSON.stringify(contractText.parsedData.contractDetails, null, 2));
      } else {
        console.log("No attestation found or parsing failed.");
      }
      console.log(contractText);
    } else {
      console.log("Please enter Bob's address to check attestations.");
    }
  },
};