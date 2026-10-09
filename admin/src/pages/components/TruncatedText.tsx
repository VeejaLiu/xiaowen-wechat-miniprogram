import {useState} from 'react';
import './TruncatedText.css'; // 导入样式文件


const maxTextLength = 20;

const TruncatedText = ({text}: { text: string }) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const renderText = () => {
        if (text.length <= maxTextLength || expanded) {
            return text;
        }
        return text.slice(0, maxTextLength);
    };

    const renderToggle = () => {
        if (text.length > maxTextLength) {
            return (
                <a type="link" onClick={handleToggle} className="toggle-button">
                    {expanded ? '↑ Collapse' : '...Expand'}
                </a>
            );
        }
        return null;
    };

    return (
        <div className="truncated-text">
            <p>
                {renderText()}
                {renderToggle()}
            </p>
        </div>
    );
};

export default TruncatedText;
