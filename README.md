import React, { useState, useContext, useEffect } from 'react';
import { CommonData } from '../../../context';
import {
  Table,
  Accordion,
  Icon,
  Form,
  Button,
  Checkbox,
  Modal
} from 'semantic-ui-react';
import FileInput from '../fileInput';
import './index.css';
import { DateInput } from 'semantic-ui-calendar-react';
import moment from 'moment';
import { ChangeDocNameAndSection } from '../changeDocName';
import { docSections } from '../../../mocks';
import {
  deleteUploadedDocument,
  uploadFileById,
  fetchDocumentList
} from '../../../common/api';

const viewId = process.env.REACT_APP_VIEWID;
const othedDocid = process.env.REACT_APP_OTHER_DOC_ID;
const onDocsUpload = (
  name,
  value,
  mapKey,
  fileName,
  documents,
  setDocuments
) => {
  const oldDocs = new Map(documents);
  const exist = oldDocs.get(mapKey).find(item => item.docName === name);
  if (exist) {
    oldDocs.get(mapKey).forEach(item => {
      if (item.docName === name) {
        item.rowId = value;
        item.fileName = fileName;
        if (!value) {
          item.publicLink = '';
        }
      }
    });
    setDocuments(oldDocs);
    return;
  }

  const newItem = {
    docName: name,
    rowId: value
  };
  oldDocs.get(mapKey).push(newItem);
  setDocuments(oldDocs);
};

const upload = obj => {
  const test = obj.fullBase64 && obj.fullBase64.split(',')[0];
  const test2 = test && test.split(';')[0];
  const type = (test2 && test2.split('/')[1]) || 'pdf';
  const base64 = obj.fullBase64 && obj.fullBase64.split(',')[1];
  obj.setLoad(true);
  !base64 &&
    deleteUploadedDocument(obj.docId)
      .then(res => {
        obj.setLoad(false);
        if (res.data) {
          onDocsUpload(
            obj.description,
            '',
            obj.mapKey,
            '',
            obj.documents,
            obj.setDocuments
          );
        }
      })
      .catch(() => {
        obj.setLoad(false);
        obj.setErrorStorage(obj.name, true);
      });
  base64 &&
    uploadFileById({
      fileName: obj.docName,
      docId: obj.docId,
      base64EncFile: base64
    })
      .then(res => {
        obj.setLoad(false);
        if (res.data) {
          res.data.Status === 1 &&
            onDocsUpload &&
            onDocsUpload(
              obj.description,
              res.data.id,
              obj.mapKey,
              res.data.fileNameOnClient,
              obj.documents,
              obj.setDocuments
            );
        } else {
          obj.setErrorStorage('Ошибка при вложении', true);
        }
      })
      .catch(() => {
        obj.setLoad(false);
        obj.setErrorStorage(obj.name, true);
      });
};

const setParamByDocId = (paramValue, docId, paramName, params, setParams) => {
  if (
    (paramName === 'docNumber' && paramValue.match(/^[0-9]+$/)) ||
    paramName !== 'docNumber'
  ) {
    const paramsCopy = params;
    const paramIndex = paramsCopy.findIndex(e => e.docId === docId);
    paramsCopy[paramIndex][paramName] = paramValue;
    setParams([...paramsCopy]);
  }
};
const ChangeDocName = ({ item, params }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      dimmer="blurring"
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={
        <Button>Фактическое наименование документ с первоисточника</Button>
      }
    >
      <Modal.Content>
        <ChangeDocNameAndSection
          param={params.find(e => e.docId === item.id)}
          setParamByDocId={setParamByDocId}
          docId={item.id}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          OK
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
const DocRows = ({ element, disabled }) => {
  const context = useContext(CommonData);
  const [errorState, setErrorState] = useState({});
  const {
    documents,
    setDocuments,
    params,
    setParams,
    deleteRow,
    setLoading,
    role
  } = context;

  const setLoad = val => {
    setLoading(val);
  };
  const setErrorStorage = (name, value) => {
    const data = {
      ...errorState,
      [name]: value
    };
    setErrorState(data);
  };
  return documents.get(element).map((item, index) => {
    const param = params.find(e => e.docId === item.id);
    return param?.docTransferFlag ? (
      <Table.Row key={index || item.id}>
        <Table.Cell textAlign="center">{index + 1}</Table.Cell>
        <Table.Cell>
          {param?.docTitle ?? item.docTitle}
          {!disabled &&
            process.env.REACT_APP_DOCS_FOR_RENAME.toString().includes(
              item.docsSetDocumentId
            ) && (
              <ChangeDocName
                item={item}
                params={params}
                setParams={setParams}
              />
            )}
        </Table.Cell>
        <Table.Cell>
          <Form.Input
            name="docNumber"
            disabled={disabled}
            value={param?.docNumber ?? ''}
            onChange={(e, { name, value }) =>
              setParamByDocId(value, item.id, name, params, setParams)
            }
            fluid
            maxLength={50}
          />
        </Table.Cell>
        <Table.Cell>
          <DateInput
            disabled={disabled}
            className="date-input"
            placeholder="01.01.2022"
            name="docDate"
            dateFormat="DD.MM.YYYY"
            value={param?.docDate ?? ''}
            onChange={(e, { name, value }) => {
              const pattern = /^\d{2}\.\d{2}\.\d{4}$/;
              if (pattern.test(value)) {
                setParamByDocId(
                  moment(value, 'DD.MM.YYYY').format('DD.MM.YYYY'),
                  item.id,
                  name,
                  params,
                  setParams
                );
              } else {
                setParamByDocId('', item.id, name, params, setParams);
              }
            }}
          />
        </Table.Cell>
        <Table.Cell textAlign="center">
          <FileInput
            fullBase64
            size="s"
            role={role}
            error={errorState && errorState.index}
            inputName={item.docName}
            onChange={(res, val, docName) => {
              upload({
                description: item.docName,
                fullBase64: val,
                name: res,
                mapKey: element,
                docId: item.id,
                docName: docName,
                documents: documents,
                setDocuments: setDocuments,
                setLoad: setLoad,
                setErrorStorage: setErrorStorage
              });
            }}
            docRowId={item.rowId ?? item.id}
            docNameAtstor={item.fileName}
            publicLink={item.publicLink}
            disabled={disabled}
          />
        </Table.Cell>
        {!disabled && (
          <>
            <Table.Cell>
              {item.uploadRequire ? 'обязательно' : 'не обязательно'}
            </Table.Cell>

            <Table.Cell>
              {element !== 'general' && (
                <Icon
                  color="red"
                  name="trash alternate"
                  onClick={e => {
                    deleteRow(item.id);
                  }}
                />
              )}
            </Table.Cell>
          </>
        )}
      </Table.Row>
    ) : (
      <></>
    );
  });
};
const DocHeader = ({ headerText, element, disabled }) => {
  const context = useContext(CommonData);
  const { addDocs } = context;
  return (
    <Table.Row>
      <Table.Cell textAlign="left" colSpan="2" className="tableCellStyle">
        <h3> {headerText} </h3>
      </Table.Cell>
      <Table.Cell textAlign="left" colSpan="5" className="tableCellStyle">
        {!disabled && (
          <Button
            size="mini"
            icon="add"
            labelPosition="right"
            label="Документ"
            onClick={e => addDocs([othedDocid], element)}
            disabled={disabled}
          />
        )}
      </Table.Cell>
    </Table.Row>
  );
};
const Documents = ({ disabled, documents }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>№</Table.HeaderCell>
          <Table.HeaderCell width={5}>Наименование документа</Table.HeaderCell>
          <Table.HeaderCell width={2}>Номер документа </Table.HeaderCell>
          <Table.HeaderCell width={2}>Дата документа </Table.HeaderCell>
          <Table.HeaderCell width={disabled ? 2 : 4} textAlign="center">
            {' '}
          </Table.HeaderCell>
          {!disabled && (
            <>
              <Table.HeaderCell width={2}>
                Признак обязательности
              </Table.HeaderCell>
              <Table.HeaderCell width={1}></Table.HeaderCell>
            </>
          )}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <DocHeader headerText="Общие документы" disabled={disabled} />
        {documents && documents.size > 0 && (
          <DocRows element="general" disabled={disabled} />
        )}
        {documents &&
          [...documents.keys()].map(element => {
            if (element !== 'general') {
              return (
                <>
                  <DocHeader
                    headerText={element}
                    element={element}
                    disabled={disabled}
                  />
                  {<DocRows element={element} disabled={disabled} />}
                </>
              );
            }
          })}
      </Table.Body>
    </Table>
  );
};
const KMDocRows = ({ element }) => {
  const context = useContext(CommonData);
  const { documents, params, setParams } = context;
  return documents.get(element).map((item, index) => {
    return (
      <Table.Row key={index}>
        <Table.Cell textAlign="center">{index + 1}</Table.Cell>
        <Table.Cell>{item.docName}</Table.Cell>
        <Table.Cell>
          {item.uploadRequire ? 'обязательно' : 'не обязательно'}
        </Table.Cell>
        <Table.Cell>
          <Checkbox
            name="docTransferFlag"
            value={params.find(e => e.docId === item.id)?.docTransferFlag ?? 0}
            onChange={(e, data) =>
              setParamByDocId(
                data.checked ? 1 : 0,
                item.id,
                'docTransferFlag',
                params,
                setParams
              )
            }
            checked={
              params.find(e => e.docId === item.id)?.docTransferFlag === 1
            }
          />
        </Table.Cell>
      </Table.Row>
    );
  });
};

const KMDocuments = ({ documents }) => {
  return (
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell width={1}>№</Table.HeaderCell>
          <Table.HeaderCell width={5}>Наименование документа</Table.HeaderCell>
          <Table.HeaderCell width={2}>Признак обязательности</Table.HeaderCell>
          <Table.HeaderCell width={3}>
            Информация о передаче документа{' '}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {documents && documents.size > 0 && (
          <>
            <Table.Row>
              <Table.Cell
                colSpan="4"
                textAlign="left"
                className="tableCellStyle"
              >
                <h3> Общие документы </h3>
              </Table.Cell>
            </Table.Row>
            {<KMDocRows element="general" />}
          </>
        )}
        {documents &&
          documents.size > 0 &&
          [...documents.keys()].map(element => {
            if (element !== 'general') {
              return (
                <>
                  <Table.Row key={element}>
                    <Table.Cell
                      colSpan="4"
                      textAlign="left"
                      className="tableCellStyle"
                    >
                      <h3> {element}</h3>
                    </Table.Cell>
                  </Table.Row>
                  {<KMDocRows element={element} />}
                </>
              );
            }
          })}
      </Table.Body>
    </Table>
  );
};

export const PackageOfDocuments = ({ disabled = false }) => {
  const context = useContext(CommonData);
  const {
    documents,
    role,
    requestNumber,
    setDocuments,
    documentChanged,
    params,
    setParams
  } = context;
  const [activeIndex, setActiveIndex] = useState(0);
  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    let isMounted = true;
    fetchDocumentList(viewId, requestNumber)
      .then(res => {
        if (isMounted) {
          const files = res.data.files;
          const docMap = new Map();
          files.map(item => {
            if (item.rowAttributes == null) {
              if (!docMap.has('general')) {
                docMap.set('general', []);
              }
              docMap.get('general').push(item);
            } else {
              item.rowAttributes.map(rowAttribute => {
                if (rowAttribute.name === 'FINUMBER') {
                  if (!docMap.has(rowAttribute.value)) {
                    docMap.set(rowAttribute.value, []);
                  }
                  docMap.get(rowAttribute.value).push(item);
                }
                return docMap;
              });
            }
            return docMap;
          });
          setDocuments(docMap);
        }
      })
      .catch(() => {
        console.log('error');
      });
    return () => {
      isMounted = false;
    };
  }, [requestNumber, setDocuments, documentChanged]);

  useEffect(() => {
    const paramsClone = [].concat(params);
    const allDocIds = [];
    const indexForDel = [];
    [...documents.keys()].forEach(element => {
      documents.get(element).forEach(item => {
        if (paramsClone.filter(e => e.docId === item.id).length === 0) {
          paramsClone.push({
            docId: item.id,
            docNumber: item?.docNumber ?? '',
            docDate: item.docDate
              ? moment(item.docDate).format('DD.MM.YYYY')
              : '',
            docSectionId: docSections.find(
              e => e.name === item.docsSetDocumentId
            ).code,
            docTitle: item.docTitle ?? '',
            docTransferFlag: 0,
            uploadRequire: item.uploadRequire
          });
        }
        allDocIds.push(item.id);
      });
    });
    if (allDocIds.length > 0) {
      paramsClone.forEach(paramItem => {
        if (!allDocIds.includes(paramItem.docId)) {
          indexForDel.push(paramItem.docId);
        }
      });
      indexForDel.forEach(id => {
        const index = paramsClone.findIndex(e => e.docId === id);
        paramsClone.splice(index, 1);
      });
    }
    setParams([...paramsClone]);
  }, [documents]);

  return (
    <div className="ui form">
      <Accordion fluid styled>
        <Accordion.Title
          className="documentAccordionTitle"
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          ПАКЕТ ДОКУМЕНТОВ
        </Accordion.Title>
        <Accordion.Content
          className="documentAccordionContent"
          active={activeIndex === 0}
        >
          {role !== 'KM' && (
            <Documents disabled={disabled} documents={documents} />
          )}
          {role === 'KM' && <KMDocuments documents={documents} />}
        </Accordion.Content>
      </Accordion>
    </div>
  );
};






index.js:319 Warning: Each child in a list should have a unique "key" prop.

Check the render method of `Documents`. See https://fb.me/react-warning-keys for more information.
    in Fragment (created by Documents)
    in Documents (at packageOfDocuments/index.js:545)
    in div (created by AccordionContent)
    in AccordionContent (at packageOfDocuments/index.js:540)
    in div (created by AccordionAccordion)
    in AccordionAccordion (created by Accordion)
    in Accordion (at packageOfDocuments/index.js:530)
    in div (at packageOfDocuments/index.js:529)
    in PackageOfDocuments (at kaoako/index.js:151)
    in div (at kaoako/index.js:146)
    in Unknown (at kaoako/index.js:195)
    in div (at formContainer/index.js:28)
    in div (created by Segment)
    in Segment (at formContainer/index.js:15)
    in div (created by Container)
    in Container (at formContainer/index.js:14)
    in div (at formContainer/index.js:13)
    in FormContainer (at commonForm.js:417)
    in Unknown (at kaoako/index.js:188)
    in Index (at commonForm.js:97)
    in CommonContainer (at containers/index.js:7)
    in div (at containers/index.js:6)
    in Page (created by Context.Consumer)
    in Route (at src/index.js:18)
    in Router (created by BrowserRouter)
    in BrowserRouter (at src/index.js:16)
console.<computed> @ index.js:1
overrideMethod @ console.js:288
printWarning @ react.development.js:315
error @ react.development.js:287
validateExplicitKey @ react.development.js:1630
validateChildKeys @ react.development.js:1656
createElementWithValidation @ react.development.js:1806
Documents @ index.js:319
renderWithHooks @ react-dom.development.js:14803
updateFunctionComponent @ react-dom.development.js:17034
beginWork @ react-dom.development.js:18610
beginWork$1 @ react-dom.development.js:23179
performUnitOfWork @ react-dom.development.js:22154
workLoopSync @ react-dom.development.js:22130
performSyncWorkOnRoot @ react-dom.development.js:21756
(anonymous) @ react-dom.development.js:11089
unstable_runWithPriority @ scheduler.development.js:653
runWithPriority$1 @ react-dom.development.js:11039
flushSyncCallbackQueueImpl @ react-dom.development.js:11084
flushSyncCallbackQueue @ react-dom.development.js:11072
scheduleUpdateOnFiber @ react-dom.development.js:21199
dispatchAction @ react-dom.development.js:15660
(anonymous) @ index.js:479
Promise.then (async)
(anonymous) @ index.js:455
commitHookEffectListMount @ react-dom.development.js:19731
commitPassiveHookEffects @ react-dom.development.js:19769
callCallback @ react-dom.development.js:188
invokeGuardedCallbackDev @ react-dom.development.js:237
invokeGuardedCallback @ react-dom.development.js:292
flushPassiveEffectsImpl @ react-dom.development.js:22853
unstable_runWithPriority @ scheduler.development.js:653
runWithPriority$1 @ react-dom.development.js:11039
flushPassiveEffects @ react-dom.development.js:22820
performSyncWorkOnRoot @ react-dom.development.js:21737
(anonymous) @ react-dom.development.js:11089
unstable_runWithPriority @ scheduler.development.js:653
runWithPriority$1 @ react-dom.development.js:11039
flushSyncCallbackQueueImpl @ react-dom.development.js:11084
flushSyncCallbackQueue @ react-dom.development.js:11072
scheduleUpdateOnFiber @ react-dom.development.js:21199
dispatchAction @ react-dom.development.js:15660
_callee$ @ useVariables.js:44
tryCatch @ useVariables.js:2
(anonymous) @ useVariables.js:2
(anonymous) @ useVariables.js:2
asyncGeneratorStep @ asyncToGenerator.js:3
_next @ asyncToGenerator.js:25
Promise.then (async)
asyncGeneratorStep @ asyncToGenerator.js:13
_next @ asyncToGenerator.js:25
Promise.then (async)
asyncGeneratorStep @ asyncToGenerator.js:13
_next @ asyncToGenerator.js:25
(anonymous) @ asyncToGenerator.js:32
(anonymous) @ asyncToGenerator.js:21
fetchData @ useVariables.js:21
(anonymous) @ useVariables.js:47
commitHookEffectListMount @ react-dom.development.js:19731
commitPassiveHookEffects @ react-dom.development.js:19769
callCallback @ react-dom.development.js:188
invokeGuardedCallbackDev @ react-dom.development.js:237
invokeGuardedCallback @ react-dom.development.js:292
flushPassiveEffectsImpl @ react-dom.development.js:22853
unstable_runWithPriority @ scheduler.development.js:653
runWithPriority$1 @ react-dom.development.js:11039
flushPassiveEffects @ react-dom.development.js:22820
performSyncWorkOnRoot @ react-dom.development.js:21737
(anonymous) @ react-dom.development.js:11089
unstable_runWithPriority @ scheduler.development.js:653
runWithPriority$1 @ react-dom.development.js:11039
flushSyncCallbackQueueImpl @ react-dom.development.js:11084
flushSyncCallbackQueue @ react-dom.development.js:11072
scheduleUpdateOnFiber @ react-dom.development.js:21199
dispatchAction @ react-dom.development.js:15660
_callee2$ @ useVariables.js:112
tryCatch @ useVariables.js:2
(anonymous) @ useVariables.js:2
(anonymous) @ useVariables.js:2
asyncGeneratorStep @ asyncToGenerator.js:3
_next @ asyncToGenerator.js:25
Promise.then (async)
asyncGeneratorStep @ asyncToGenerator.js:13
_next @ asyncToGenerator.js:25
(anonymous) @ asyncToGenerator.js:32
(anonymous) @ asyncToGenerator.js:21
fetchAll @ useVariables.js:86
(anonymous) @ useVariables.js:115
commitHookEffectListMount @ react-dom.development.js:19731
commitPassiveHookEffects @ react-dom.development.js:19769
callCallback @ react-dom.development.js:188
invokeGuardedCallbackDev @ react-dom.development.js:237
invokeGuardedCallback @ react-dom.development.js:292
flushPassiveEffectsImpl @ react-dom.development.js:22853
unstable_runWithPriority @ scheduler.development.js:653
runWithPriority$1 @ react-dom.development.js:11039
flushPassiveEffects @ react-dom.development.js:22820
(anonymous) @ react-dom.development.js:22699
workLoop @ scheduler.development.js:597
flushWork @ scheduler.development.js:552
performWorkUntilDeadline @ scheduler.development.js:164
Show 82 more frames
Show lessUnderstand this error
index.js:479 Warning: Each child in a list should have a unique "key" prop. See https://fb.me/react-warning-keys for more information.
    in DocRows (at packageOfDocuments/index.js:327)
    in tbody (created by TableBody)
    in TableBody (at packageOfDocuments/index.js:324)
    in table (created by Table)
    in Table (at packageOfDocuments/index.js:304)
    in Documents (at packageOfDocuments/index.js:545)
    in div (created by AccordionContent)
    in AccordionContent (at packageOfDocuments/index.js:540)
    in div (created by AccordionAccordion)
    in AccordionAccordion (created by Accordion)
    in Accordion (at packageOfDocuments/index.js:530)
    in div (at packageOfDocuments/index.js:529)
    in PackageOfDocuments (at kaoako/index.js:151)
    in div (at kaoako/index.js:146)
    in Unknown (at kaoako/index.js:195)
    in div (at formContainer/index.js:28)
    in div (created by Segment)
    in Segment (at formContainer/index.js:15)
    in div (created by Container)
    in Container (at formContainer/index.js:14)
    in div (at formContainer/index.js:13)
    in FormContainer (at commonForm.js:417)
    in Unknown (at kaoako/index.js:188)
    in Index (at commonForm.js:97)
    in CommonContainer (at containers/index.js:7)
    in div (at containers/index.js:6)
    in Page (created by Context.Consumer)
    in Route (at src/index.js:18)
    in Router (created by BrowserRouter)
    in BrowserRouter (at src/index.js:16)
