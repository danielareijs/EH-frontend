import {useState} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Trailers from '../components/Trailers';
import Contact from '../components/Contact';

const Content = () => {
    const [activeTab, setActiveTab] = useState('placements');

    return(
        <div className="content">
            <Tabs>
                <TabList className="tablist">
                <Tab className={activeTab === 'placements' ? 'tab active' : 'tab'} onClick={() => setActiveTab('placements')}>
                    <p>Trailers</p>
                </Tab>
                <Tab className={activeTab === 'other' ? 'tab active' : 'tab'} onClick={() =>setActiveTab('other')}>
                    <p>Film/Ads/Games</p>
                </Tab>
                <Tab className={activeTab === 'music' ? 'tab active' : 'tab'} onClick={() =>setActiveTab('music')}>
                    <p>Music</p>
                </Tab>
                </TabList>

                <TabPanel>
                    <Trailers contentType={'trailer'}/>
                </TabPanel>
                <TabPanel>
                    <Trailers contentType={'other'}/>
                </TabPanel>
                <TabPanel>
                    <Trailers contentType={'music'}/>
                </TabPanel>
            </Tabs>
            <Contact />
        </div>
    )
};

export default Content;