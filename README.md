checkRes =
      provisions?.length > 0
        ? (checkRes = provisions.find((x) => utils.validate(x?.checkResult)) ? true : false)
        : true;

    runCheckCond =
      provisions.length > 0
        ? provisions.find((x) => !x?.runCheck)?.pledgerBIN !== collateralDTO?.bin
        : false;
