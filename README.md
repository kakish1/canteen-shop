func (h *Handler) CheckListbySMP(c *gin.Context) {
	/*
	   Кәкіш Ерасыл:
	   CliType -
	   Guarantor - Гарант
	   Client - Заемщик
	   Codebtor  - Созаемщик
	   Pledger  - Залогодатель
	*/
	ESAction := "CheckListbySMP"
	const UlCh = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"RF_1\",\"RF_2\",\"RF_3\",\"RF_14\",\"RF_16\",\"RF_28\",\"RF_4\",\"RF_32\",\"RF_33\",\"RF_34\",\"RF_35\",\"RF_36\",\"RF_37\""
	const Ullvl1Ch = "\"E_KART\",\"COURT_DECISION\",\"TAX_DEBTS\",\"COURT_DECISION\",\"RF_5\",\"RF_6\""
	const UlHasLeader = "\"RF_9\",\"RF_10\",\"RF_11\",\"RF_12\",\"RF_13\",\"RF_15\",\"RF_24\""
	const UlHasUcheredFL = "\"RF_17\",\"RF_19\",\"RF_20\",\"RF_21\",\"RF_22\",\"RF_23\",\"RF_25\""
	const FlLeaderCh = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\""
	//const FlLeaderLvl1Ch = "\"BANK_EMPLOYEE\""
	const FlFlCh = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\""
	// fmt.Println(ESAction + "Start")
	const FlP = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"COURT_DECISION\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\",\"RF_10\",\"RF_11\",\"RF_12\",\"RF_13\",\"RF_15\",\"RF_24\",\"RF_17\",\"RF_19\",\"RF_20\",\"RF_21\",\"RF_22\",\"RF_25\""
	const FlPlvl = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\""

	const UlP = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"RF_1\",\"RF_2\",\"RF_3\",\"RF_14\",\"RF_16\",\"RF_28\",\"RF_4\",\"RF_32\",\"RF_33\",\"RF_34\",\"RF_35\",\"RF_36\",\"RF_37\""
	const UlPlvl1 = "\"COURT_DECISION\""
	const UlPHasLeader = "\"RF_10\",\"RF_11\",\"RF_12\",\"RF_13\""
	const UlPHasUcheredFL = "\"RF_17\",\"RF_19\",\"RF_20\",\"RF_21\",\"RF_22\",\"RF_25\""
	const FlPLeader = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\""

	const FlG = "\"E_KART\",\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"COURT_DECISION\",\"TAX_DEBTS\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\",\"RF_10\",\"RF_11\",\"RF_12\",\"RF_13\",\"RF_19\",\"RF_20\",\"RF_21\",\"RF_22\",\"RF_25\""
	const FlGlvl = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\""

	const UlG = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"RF_1\",\"RF_3\",\"RF_4\",\"RF_32\",\"RF_33\",\"RF_34\",\"RF_35\",\"RF_36\",\"RF_37\""
	const UlGlvl1 = "\"E_KART\",\"COURT_DECISION\",\"TAX_DEBTS\""
	const UlGHasLeaderLvl1 = "\"BANK_EMPLOYEE\""
	const UlGHasLeaderLvl = "\"RF_10\",\"RF_11\",\"RF_13\""
	const FlGLeader = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\""

	var inpVal []model.Borrower
	err := c.Bind(&inpVal)
	if err != nil {
		// fmt.Println("ERROR on Bind | " + err.Error())
		go h.log.Error(h.config.ESComponent, ESAction, -1, "ERROR on Bind ", err.Error(), "", "", nil)
		c.JSON(422, &err)
		return
	}
	var vvIntLvl int = 0
	var zzIntLvl int = 0
	for i, vv := range inpVal {
		// fmt.Println(strconv.Itoa(i) + " | " + vv.IinBin)
		vvIntLvl, err = strconv.Atoi(vv.Level)
		if err != nil {
			// fmt.Println("vvIntLvl = " + vv.Level + " int | " + err.Error())
			go h.log.Error(h.config.ESComponent, ESAction, -1, "vvIntLvl = "+vv.Level+" int | ", err.Error(), "", "", nil)
			c.JSON(422, &err)
			return
		}
		zzIntLvl = 0
		for j, zz := range inpVal {
			// fmt.Println("	" + strconv.Itoa(j) + " | " + zz.IinBin)
			zzIntLvl, err = strconv.Atoi(zz.Level)
			if err != nil {
				// fmt.Println("	zzIntLvl = " + zz.Level + " int | " + err.Error())
				go h.log.Error(h.config.ESComponent, ESAction, -1, "	zzIntLvl = "+zz.Level+" int | ", err.Error(), "", "", nil)
				c.JSON(422, &err)
				return
			}
			if (i != j) && (zzIntLvl == vvIntLvl) && (zz.ParentBIN == vv.IinBin) && (zz.IinBin != "") && (zz.Role == "leader") { //
				inpVal[i].UlHasLeader = true
				// fmt.Println("	inpVal[i] = UlHasLeader")
			}
			// if zz.IinBin =="861017301834"
			if (i != j) && (zzIntLvl == vvIntLvl+1) && (zz.ParentBIN == vv.IinBin) && (zz.IinBin != "") && (zz.Role == "fl") { //
				inpVal[i].UlHasUcheredFL = true
				// fmt.Println("	inpVal[i] = UlHasLeader")
			}

		}
	}
	if inpVal[0].CliType == "" {
		for i, vv := range inpVal {
			if vv.IinBin != "" {
				if vv.Role == "ul" {
					vv.CheckReq = UlCh
					if vv.Level == "1" {
						vv.CheckReq += "," + Ullvl1Ch
					}
					if (vv.UlHasLeader) && (vv.Level == "1") {
						vv.CheckReq += "," + UlHasLeader
					}
					if (vv.UlHasUcheredFL) && (vv.Level == "1") {
						vv.CheckReq += "," + UlHasUcheredFL
					}
				}
				if vv.Role == "leader" {
					vv.CheckReq += FlLeaderCh
					// if vv.Level == "1" {
					// 	vv.CheckReq += "," + FlLeaderLvl1Ch
					// }
				}
				if vv.Role == "fl" {
					vv.CheckReq += FlFlCh
				}
				inpVal[i].CheckReq = vv.CheckReq
			}

		}
	} else if inpVal[0].CliType == "Pledger" {
		for i, vv := range inpVal {
			if vv.IinBin != "" {
				if vv.Role == "ul" {
					vv.CheckReq = UlP //Базовые
					if vv.Level == "1" {
						vv.CheckReq += "," + UlPlvl1
					}
					if vv.UlHasLeader {
						vv.CheckReq += "," + UlPHasLeader
					}
					if vv.UlHasUcheredFL {
						vv.CheckReq += "," + UlPHasUcheredFL
					}
				}
				if vv.Role == "leader" {
					vv.CheckReq += FlPLeader
				}
				if vv.Role == "fl" {
					if vv.Level == "1" {
						vv.CheckReq += FlP
					} else {
						vv.CheckReq += FlPlvl
					}
				}
				inpVal[i].CheckReq = vv.CheckReq
			}

		}
	} else if inpVal[0].CliType == "Guarantor" {
		for i, vv := range inpVal {
			if vv.IinBin != "" {
				if vv.Role == "ul" {
					vv.CheckReq = UlG //Базовые
					if vv.Level == "1" {
						vv.CheckReq += "," + UlGlvl1
					}
					if vv.UlHasLeader {
						if vv.Level == "1" {
							vv.CheckReq += "," + UlGHasLeaderLvl1
						} else {
							vv.CheckReq += "," + UlGHasLeaderLvl
						}

					}
					if vv.UlHasUcheredFL {
						vv.CheckReq += "," + UlPHasUcheredFL
					}
				}
				if vv.Role == "leader" {
					vv.CheckReq += FlGLeader
				}
				if vv.Role == "fl" {
					if vv.Level == "1" {
						vv.CheckReq += FlG
					} else {
						vv.CheckReq += FlGlvl
					}
				}
				inpVal[i].CheckReq = vv.CheckReq
			}

		}
	}
	c.JSON(200, &inpVal)
}





Конечно! Вот переписанный метод на C# с использованием .NET Framework и ASP.NET MVC:

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Newtonsoft.Json;

public class Handler : Controller
{
    /*
       Кәкіш Ерасыл:
       CliType -
       Guarantor - Гарант
       Client - Заемщик
       Codebtor  - Созаемщик
       Pledger  - Залогодатель
    */
    private const string ESAction = "CheckListbySMP";
    private const string UlCh = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"RF_1\",\"RF_2\",\"RF_3\",\"RF_14\",\"RF_16\",\"RF_28\",\"RF_4\",\"RF_32\",\"RF_33\",\"RF_34\",\"RF_35\",\"RF_36\",\"RF_37\"";
    private const string Ullvl1Ch = "\"E_KART\",\"COURT_DECISION\",\"TAX_DEBTS\",\"COURT_DECISION\",\"RF_5\",\"RF_6\"";
    private const string UlHasLeader = "\"RF_9\",\"RF_10\",\"RF_11\",\"RF_12\",\"RF_13\",\"RF_15\",\"RF_24\"";
    private const string UlHasUcheredFL = "\"RF_17\",\"RF_19\",\"RF_20\",\"RF_21\",\"RF_22\",\"RF_23\",\"RF_25\"";
    private const string FlLeaderCh = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\"";
    private const string FlFlCh = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\"";
    private const string FlP = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"COURT_DECISION\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\",\"RF_10\",\"RF_11\",\"RF_12\",\"RF_13\",\"RF_15\",\"RF_24\",\"RF_17\",\"RF_19\",\"RF_20\",\"RF_21\",\"RF_22\",\"RF_25\"";
    private const string FlPlvl = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\"";
    private const string UlP = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"RF_1\",\"RF_2\",\"RF_3\",\"RF_14\",\"RF_16\",\"RF_28\",\"RF_4\",\"RF_32\",\"RF_33\",\"RF_34\",\"RF_35\",\"RF_36\",\"RF_37\"";
    private const string UlPlvl1 = "\"COURT_DECISION\"";
    private const string UlPHasLeader = "\"RF_10\",\"RF_11\",\"RF_12\",\"RF_13\"";
    private const string UlPHasUcheredFL = "\"RF_17\",\"RF_19\",\"RF_20\",\"RF_21\",\"RF_22\",\"RF_25\"";
    private const string FlPLeader = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\"";
    private const string FlG = "\"E_KART\",\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"COURT_DECISION\",\"TAX_DEBTS\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\",\"RF_10\",\"RF_11\",\"RF_12\",\"RF_13\",\"RF_19\",\"RF_20\",\"RF_21\",\"RF_22\",\"RF_25\"";
    private const string FlGlvl = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\"";
    private const string UlG = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"RF_1\",\"RF_3\",\"RF_4\",\"RF_32\",\"RF_33\",\"RF_34\",\"RF_35\",\"RF_36\",\"RF_37\"";
    private const string UlGlvl1 = "\"E_KART\",\"COURT_DECISION\",\"TAX_DEBTS\"";
    private const string UlGHasLeaderLvl1 = "\"BANK_EMPLOYEE\"";
    private const string UlGHasLeaderLvl = "\"RF_10\",\"RF_11\",\"RF_13\"";
    private const string FlGLeader = "\"TERROR_BASE\",\"LENDING_RECOMMENDATION\",\"RELATED\",\"AML_RISK\",\"BANK_EMPLOYEE\"";

    [HttpPost]
    public ActionResult CheckListbySMP()
    {
        List<Borrower> inpVal;
        try
        {
            inpVal = JsonConvert.DeserializeObject<List<Borrower>>(new StreamReader(Request.InputStream).ReadToEnd());
        }
        catch (Exception err)
        {
            LogError(ESAction, "ERROR on Bind", err.Message);
            return new HttpStatusCodeResult(422, err.Message);
        }

        for (int i = 0; i < inpVal.Count; i++)
        {
            var vv = inpVal[i];
            int vvIntLvl, zzIntLvl;

            if (!int.TryParse(vv.Level, out vvIntLvl))
            {
                LogError(ESAction, "vvIntLvl = " + vv.Level + " int | ", "Invalid Level format");
                return new HttpStatusCodeResult(422, "Invalid Level format");
            }

            for (int j = 0; j < inpVal.Count; j++)
            {
                var zz = inpVal[j];
                if (!int.TryParse(zz.Level, out zzIntLvl))
                {
                    LogError(ESAction, "zzIntLvl = " + zz.Level + " int | ", "Invalid Level format");
                    return new HttpStatusCodeResult(422, "Invalid Level format");
                }

                if (i != j && zzIntLvl == vvIntLvl && zz.ParentBIN == vv.IinBin && !string.IsNullOrEmpty(zz.IinBin) && zz.Role == "leader")
                {
                    inpVal[i].UlHasLeader = true;
                }

                if (i != j && zzIntLvl == vvIntLvl + 1 && zz.ParentBIN == vv.IinBin && !string.IsNullOrEmpty(zz.IinBin) && zz.Role == "fl")
                {
                    inpVal[i].UlHasUcheredFL = true;
                }
            }
        }

        string clitype = inpVal.FirstOrDefault()?.CliType ?? string.Empty;
        switch (clitype)
        {
            case "":
                ProcessDefaultCheckList(inpVal);
                break;
            case "Pledger":
                ProcessPledgerCheckList(inpVal);
                break;
            case "Guarantor":
                ProcessGuarantorCheckList(inpVal);
                break;
            default:
                break;
        }

        return Json(inpVal);
    }

    private void ProcessDefaultCheckList(List<Borrower> inpVal)
    {
        foreach (var vv in inpVal)
        {
            if (!string.IsNullOrEmpty(vv.IinBin))
            {
                switch (vv.Role)
                {
                    case "ul":
                        vv.CheckReq = UlCh;
                        if (vv.Level == "1")
                        {
                            vv.CheckReq += "," + Ullvl1Ch;
                            if (vv.UlHasLeader)
                            {
                                vv.CheckReq += "," + UlHasLeader;
                            }
                            if (vv.UlHasUcheredFL)
                            {
                                vv.CheckReq += "," + UlHasUcheredFL;
                            }
                        }
                        break;
                    case "leader":
                        vv.CheckReq += FlLeaderCh;
                        break;
                    case "fl":
                        vv.CheckReq += FlFlCh;
                        break;
                }
            }
        }
    }

    private void ProcessPledgerCheckList(List<Borrower> inpVal)
    {
        foreach (var vv in inpVal)
        {
            if (!string.IsNullOrEmpty(vv.IinBin))
            {
                switch (vv.Role)
                {
                    case "ul":
                        vv.CheckReq = UlP;
                        if (vv.Level == "1")
                        {
                            vv.CheckReq += "," + UlPlvl1;
                        }
                        if (vv.UlHasLeader)
                        {
                            vv.CheckReq += "," + UlPHasLeader;
                        }
                        if (vv.UlHasUcheredFL)
                        {
                            vv.CheckReq += "," + UlPHasUcheredFL;
                        }
                        break;
                    case "leader":
                        vv.CheckReq += FlPLeader;
                        break;
                    case "fl":
                        vv.CheckReq += vv.Level == "1" ? FlP : FlPlvl;
                        break;
                }
            }
        }
    }

    private void ProcessGuarantorCheckList(List<Borrower> inpVal)
    {
        foreach (var vv in inpVal)
        {
            if (!string.IsNullOrEmpty(vv.IinBin))
            {
                switch (vv.Role)
                {
                    case "ul":
                        vv.CheckReq = UlG;
                        if (vv.Level == "1")
                        {
                            vv.CheckReq += "," + UlGlvl1;
                        }
                        if (vv.UlHasLeader)
                        {
                            vv.CheckReq += vv.Level == "1" ? "," + UlGHasLeaderLvl1 : "," + UlGHasLeaderLvl;
                        }
                        if (vv.UlHasUcheredFL)
                        {
                            vv.CheckReq += "," + UlPHasUcheredFL;
                        }
                        break;
                    case "leader":
                        vv.CheckReq += FlGLeader;
                        break;
                    case "fl":
                        vv.CheckReq += vv.Level == "1" ? FlG : FlGlvl
