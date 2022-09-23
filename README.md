# ALASTOR: Reconstructing the Provenance of Serverless Intrusions

This code was implemented as part of the XXXX [1] paper. We provide a easy automated implementation of [ALASTOR: Reconstructing the Provenance of Serverless Intrusions](https://www.usenix.org/conference/usenixsecurity22/presentation/datta) (USENIX Security 22) [2], you can find the original code-base [here](https://bitbucket.org/sts-lab/alastor). We ask people to [cite](#References) both works when using the software for academic research papers.

## Introduction

Serverless computing has freed developers from the burden of managing their own platform and infrastructure, allowing them to rapidly prototype and deploy applications. Despite its surging popularity, however, serverless raises a number of concerning security implications. Among them is the difficulty of investigating intrusions – by decomposing traditional applications into ephemeral re-entrant functions, serverless has enabled attackers to conceal their activities within legitimate workflows, and even prevent root cause analysis by abusing warm container reuse policies to break causal paths. Unfortunately, neither traditional approaches to system auditing nor commercial serverless security products provide the transparency needed to accurately track these novel threats.

In this work, we propose ALASTOR, a provenance-based auditing framework that enables precise tracing of suspicious events in serverless applications. ALASTOR records function activity at both system and application layers to capture a holistic picture of each function instances' behavior. It then aggregates provenance from different functions at a central repository within the serverless platform, stitching it together to produce a global data provenance graph of complex function workflows. ALASTOR is both function and language-agnostic, and can easily be integrated into existing serverless platforms with minimal modification. We implement ALASTOR for the OpenFaaS platform and evaluate its performance using the well-established Nordstrom Hello,Retail! application, discovering in the process that ALASTOR imposes manageable overheads (13.74%), in exchange for significantly improved forensic capabilities as compared to commercially-available monitoring tools. To our knowledge, ALASTOR is the first auditing framework specifically designed to satisfy the operational requirements of serverless platforms.

## Getting Started

### AWS
[AWS: Hello Retail with Edpsagon](aws/README.md)

### OpenFaaS
[OpenFaaS: Hello Retail Vanilla/Alastor](open-faas/README.md)

### OpenFaaS: of-watchdog

Add as Submodule

To view the implementation of Alastor in of-watchdog, access the repository [ufms-lab/of-watchdog](https://github.com/ufms-lab/of-watchdog/tree/alastor)

### DeepLog

Add as Submodule

## References

[1] `xxxx`

[2] `Datta, P., Polinsky, I., Inam, M. A., Bates, A., & Enck, W. (2022). {ALASTOR}: Reconstructing the Provenance of Serverless Intrusions. In 31st USENIX Security Symposium (USENIX Security 22) (pp. 2443-2460).`

### Bibtex

#### XXX
```
@inproceedings{datta2022alastor,
  title={XXX},
  author={Vilela, Alison and Ferreira, Ronaldo A. and Silva, Carlos A. and Carvalho, Fabricio B.},
  booktitle={XXX (XXX 2X)},
  pages={XXX},
  year={XXX}
}
```
#### Alastor
```
@inproceedings{datta2022alastor,
  title={$\{$ALASTOR$\}$: Reconstructing the Provenance of Serverless Intrusions},
  author={Datta, Pubali and Polinsky, Isaac and Inam, Muhammad Adil and Bates, Adam and Enck, William},
  booktitle={31st USENIX Security Symposium (USENIX Security 22)},
  pages={2443--2460},
  year={2022}
}
```
