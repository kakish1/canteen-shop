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
