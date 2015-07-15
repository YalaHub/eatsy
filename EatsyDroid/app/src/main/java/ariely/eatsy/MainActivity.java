package ariely.eatsy;

import android.content.Context;
import android.os.Bundle;
import android.support.design.widget.TabLayout;
import android.support.v4.app.FragmentPagerAdapter;
import android.support.v4.view.ViewPager;
import android.support.v7.app.AppCompatActivity;


public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Get the ViewPager and set it's PagerAdapter so that it can display items
        ViewPager viewPager = (ViewPager) findViewById(R.id.viewpager);
        viewPager.setAdapter(new SampleFragmentPagerAdapter(getSupportFragmentManager(),
                MainActivity.this));

        // Give the TabLayout the ViewPager
        TabLayout tabLayout = (TabLayout) findViewById(R.id.sliding_tabs);
        tabLayout.setupWithViewPager(viewPager);
    }




    static class SampleFragmentPagerAdapter extends FragmentPagerAdapter {
        private static final int LIST_POSITION = 0;
        private static final int MAP_POSITION = 1;
        private String tabTitles[] = new String[] { "List View", "Map View"};
        private Context context;

        public SampleFragmentPagerAdapter(android.support.v4.app.FragmentManager fm, Context context) {
            super(fm);
            this.context = context;
        }

        @Override
        public int getCount() {
            return tabTitles.length;
        }

        @Override
        public android.support.v4.app.Fragment getItem(int position) {
            switch (position){
                case LIST_POSITION:
                    return new EatsyListFragment();
                case MAP_POSITION:
                    return new EatsyMapFragment();
                default:
                    return new EatsyErrorFragment();
            }
        }

        @Override
        public CharSequence getPageTitle(int position) {
            // Generate title based on item position
            return tabTitles[position];
        }
    }

}
