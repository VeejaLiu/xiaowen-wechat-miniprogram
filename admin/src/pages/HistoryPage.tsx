import {useEffect, useState} from "react";
import {HistoryApi} from "../service/HistoryApi.ts";
import { Image, Pagination, PaginationProps} from "antd";
import "./HistoryPage.css";
import TruncatedText from "./components/TruncatedText.tsx";
import {TATTOO_STYLES} from "../constant/style.ts";

const statusMap: string[] = [
    "生成中",
    "完成",
    "失败",
];

function HistoryPage() {

    // {
    // 	"id": 130,
    // 	"userId": "admin",
    // 	"style": 1,
    // 	"prompt": "一只可爱的猫",
    // 	"promptEnglish": "A cute cat",
    // 	"generateUsedTime": 3000,
    // 	"status": 1,
    // 	"images": [
    // 		"http://123.60.97.192:9001/pic/2023-11-07T17:04:13.829028_1.png",
    // 		"http://123.60.97.192:9001/pic/2023-11-07T17:04:13.829028_1.png",
    // 		"http://123.60.97.192:9001/pic/2023-11-07T17:04:13.829028_1.png",
    // 		"http://123.60.97.192:9001/pic/2023-11-07T17:04:13.829028_1.png"
    // 	],
    // 	"createTime": "2023-10-19T11:19:04.000Z"
    // },
    const [history, setHistory] = useState<any[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [page, setPage] = useState<number>(1);
    // const [pageSize, setPageSize] = useState<number>(2);


    const getHistory = async (
        {
            page,
            pageSize
        }: {
            page: number,
            pageSize: number
        }) => {
        const result = await HistoryApi.getHistory({
            page: page,
            pageSize: pageSize
        });
        console.log(result);
        setHistory(result.history);
        setTotal(result.total);
    }

    // const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, size) => {
    //     console.log('Current: ', current, '; PageSize: ', size);
    //     setPageSize(size);
    //     setPage(current);
    // }

    const onChange: PaginationProps['onChange'] = (page) => {
        console.log('Page: ', page);
        setPage(page);
    };

    useEffect(() => {
        getHistory({page, pageSize: 2});
    }, [page]);

    return (
        <>
            <Pagination
                className={"pagination"}
                total={total}
                current={page}
                defaultCurrent={1}
                pageSize={2}
                onChange={onChange}
                showSizeChanger={false}
                // onShowSizeChange={onShowSizeChange}
            />

            {
                history.map((item) => {
                    return (
                        <div className={"historyShow"}>
                            <table className='table'>
                                <tr>
                                    <th>ID</th>
                                    <td>{item.id}</td>
                                </tr>
                                <tr>
                                    <th>风格</th>
                                    <td>
                                        <b>
                                            {TATTOO_STYLES[item.style - 1].name}
                                        </b>
                                    </td>
                                </tr>
                                <tr>
                                    <th>描述</th>
                                    <td>
                                        <TruncatedText text={item.prompt}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>译文</th>
                                    <td>
                                        <TruncatedText text={item.promptEnglish}/>
                                    </td>
                                </tr>
                                <tr>
                                    <th>用时</th>
                                    <td>{item.generateUsedTime / 1000}s</td>
                                </tr>
                                <tr>
                                    <th>状态</th>
                                    <td>{statusMap[item.status]}</td>
                                </tr>
                                <tr>
                                    <th>建于</th>
                                    <td>{new Date(item.createTime).toLocaleString()}</td>
                                </tr>
                            </table>
                            <Image.PreviewGroup>
                                {
                                    item?.images?.map((image: string) => {
                                        return (<Image width={200} src={image}/>);
                                    })
                                }
                            </Image.PreviewGroup>
                            {
                                item.status === 2 ? (
                                    <div className={"success"}>
                                        Failed
                                    </div>
                                ) : null
                            }
                        </div>
                    );
                })
            }

        </>
    );
}


export default HistoryPage;
