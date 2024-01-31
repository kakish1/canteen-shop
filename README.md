1. provisons > 0 else true
2. provisons если элемент runCheck  = true, то не должно быть элементов которые не проходят условие!utils.validate(x?.checkResult), то есть возвращать true, если элементов таких нет то false
3. provisons если элемент runCheck  = false, то не должно быть элементов которые x?.pledgerBIN !== collateralDTO?.bin, то есть, если collateralDTO?.bin = 123456, то если есть элемент с runCheck = false и не равен 123456 то возвращать true иначе false
