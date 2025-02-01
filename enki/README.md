# CIP-139 DRep Incentivization Framework


## Abstract

This CIP addresses the current challenge of incentivizing Delegated Representatives (DReps) to participate and vote in an informed and representative manner. At present, the system relies heavily on the altruism of DReps, risking a concentration of influence in the hands of smaller groups at the expense of broader community involvement. To mitigate this, the CIP proposes a performance-based reward mechanism that uses multiple parameters to evaluate the contributions of DReps. 

This approach aims to foster diverse participation, ensuring that voting outcomes align more closely with the interests of the broader Cardano community rather than personal financial motives.

## Motivation: why is this CIP necessary?
Delegated Representatives (DReps) currently lack sufficient incentives to vote in an informed manner, apart from utilizing their influence for the benefit of the ecosystem or for personal gain. The existing system relies heavily on the altruism of DReps, which poses the risk of centralizing decision-making power in the hands of a small number of individuals. 
This concentration undermines broader community representation. Our proposed CIP introduces a mechanism designed to incentivize participation from a more diverse group, ensuring that voting outcomes reflect the collective interests of the Cardano community rather than the individual’s altruistic disposition of DReps.

## Parameters Explanation
To determine a number that accurately reflects the performance of a DRep, we will incorporate several parameters, each assigned a specific weight to evaluate various aspects of the DRep’s performance. These parameters collectively produce a score that falls within a predefined scale, which subsequently determines the rewards allocated to the DRep.
Our objective is to capture both objective metrics and subjective qualities that comprise a DRep’s aggregate performance. We acknowledge that these parameters cannot fully encapsulate all aspects of the work involved, and some subjective, qualitative characteristics must be quantified. Nevertheless, our goal is to provide a tool that offers a meaningful representation of overall performance.
The parameters will be updated every 40 epochs to generate a DRep score, which will then be used to calculate the rewards for DReps registered on-chain. More or fewer parameters could be better suited to scoring DReps; the ones presented are proposals. 

### Parameters
* Delegated voting power
  The ADA delegated to an individual DRep divided by the total ADA delegated to DReps during an Epoch.

* Number of voted and accepted Governance Actions
  The number of successfully approved Governance Actions
 
* How many proposed and accepted Governance through DReps
  Total number of Governance Actions approved by the whole of the DReps

* Participation in governance action through votes
  Number of Governance Actions voted by a DRep divided by the number of votes during an Epoch.  

* Number of vetos for yes-voted governance actions
  Number of vetoed Governance Actions by the CC of an individual DRep

* Inter-branch decentralization (between branches: DRep/SPO/CC)
  A scale from 0 to 1. A person who is only a DRep gets 1; if a person is also a CC member, 0.3 points are subtracted from the number. If a person is an SPO, 0.5 points are subtracted. A DRep who is a CC member plus an SPO gets subtracted 0.8 points.

* DRep scoring point system for other DReps (Positive votes and negative votes)
  After voting, the DRep will be shown the rationales of four other DReps who voted in accordance with them. The DRep will qualitatively score the four rationales, dividing a total of 1.0 points between the randomly presented options. Identity is not attributed to the four rationales presented.

* Ada delegators are unstaked from a DRep after 3 years of wallet inactivity (no transactions)

* Governance action score based on yes and no votes from DReps and an independent governance action merit score. (time period)
  The parameter is a summation of ratios; a perfect score would be a 100% distribution of the epoch’s rewards. Any different score in one or more parameters will result in a reduction of rewards based on the percentage achieved. 

## Rationale: how does this CIP achieve its goals?

This CIP introduces a framework to mitigate the reliance on altruism among DReps (Delegated Representatives) by incentivizing informed, community-oriented voting behaviors. The mechanism ensures broader representation within the voting process by encouraging participation from diverse stakeholders across the Cardano community. By aligning voting incentives with the collective interests of the ecosystem, this CIP reduces the risk of centralized influence or self-serving voting patterns. 

As a result, the proposal promotes a more balanced decision-making process that reflects the diverse perspectives and needs of the Cardano community while maintaining the integrity and decentralization principles foundational to the ecosystem.

## Implementation Plan
The proposed implementation plan for this CIP emphasizes an off-chain approach for data collection, processing, and execution of the incentive mechanism, ensuring efficiency and flexibility. All necessary calculations, such as participation metrics and reward distribution formulas, will be handled off-chain to minimize on-chain computational costs and complexity. 

Once the final reward numbers for each Delegated Representative (DRep) are determined, only this output data will be submitted to the blockchain. This approach leverages the strengths of off-chain systems for scalability and adaptability while maintaining transparency and immutability for critical outputs on-chain, ensuring alignment with the principles of the Cardano ecosystem.
Testing Period
During the testing period, we will evaluate the mechanism by taking a snapshot of all relevant parameters every 40 epochs. The process will culminate in the calculation of DRep rewards, with the final reward outputs recorded on-chain. 


	{
	"DRep Reward": {
 	 
      	"Rewards": [{
        	"DRepID_1" : "Amount",
          	"DRerpD_2" : "Amount",
          	"DRepID_3" : "Amount",
          	"DRepID_4" : "Amount"
      	}]
	}
}

This will generate a transparent, immutable list of all DReps along with their respective scores (reward numbers) alongside relevant parameters. The testing period is planned to last for one year, corresponding to 73 epochs, to ensure sufficient data and feedback for refining the mechanism and validating its effectiveness before full implementation.
This testing process will undergo thorough revision and refinement throughout the year, guided by continuous feedback from the Cardano Community. Every aspect of the mechanism will be carefully analyzed to identify areas for improvement, ensuring that the system aligns with community expectations and remains effective in achieving its intended goals. By fostering open communication and incorporating constructive input, we aim to create a robust, transparent, and equitable system that reflects the diverse voices and needs of the ecosystem.

## Hard-fork

The testing period, once concluded, will need a hard-fork combinator event. The protocol will need to change to add automatic DRep rewards distribution automatically. This will avoid the need to have humans sign a transaction that distributes rewards.  
Acknowledgments
I would like to thank those who contributed to the DRep Incentives Program.

Thank to:

* Sebastian Pereira Gutierrez
* Seomon
* Martin Marinov
* Lazar Sapundziev
* Ken Ladd
* Carlos Lopez De Lara

## Copyright
This CIP is licensed under the MIT License
