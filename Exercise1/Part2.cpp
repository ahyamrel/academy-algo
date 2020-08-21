/* Magishim: 208584383 מוריאל בורודקן
			 315850461 יובל אחתרזאד   */

#include <iostream>
using namespace std;
  
// size of binary square matrix 
#define N 15 
  
// Function to find the size of the largest '+' 
// formed by all 1's in given binary matrix 
int* findLargestPlus(int mat[N][N]) 
{ 
    int left[N][N], right[N][N], top[N][N], 
        bottom[N][N]; 
  
    for (int i = 0; i < N; i++) 
    { 
        top[0][i] = mat[0][i]; 
  
        bottom[N - 1][i] = mat[N - 1][i]; 
  
        left[i][0] = mat[i][0]; 
  
        right[i][N - 1] = mat[i][N - 1]; 
    } 
  
    for (int i = 0; i < N; i++) 
    { 
        for (int j = 1; j < N; j++) 
        { 
            // calculate left matrix (filled left to right) 
            if (mat[i][j] == 1) 
                left[i][j] = left[i][j - 1] + 1; 
            else
                left[i][j] = 0; 
  
            // calculate top matrix 
            if (mat[j][i] == 1) 
                top[j][i] = top[j - 1][i] + 1; 
            else
                top[j][i] = 0; 
  
            // calculate new value of j to calculate 
            // value of bottom(i, j) and right(i, j) 
            j = N - 1 - j; 
  
            // calculate bottom matrix 
            if (mat[j][i] == 1) 
                bottom[j][i] = bottom[j + 1][i] + 1; 
            else
                bottom[j][i] = 0; 
  
            // calculate right matrix 
            if (mat[i][j] == 1) 
                right[i][j] = right[i][j + 1] + 1; 
            else
                right[i][j] = 0; 
  
            // revert back to old j 
            j = N - 1 - j; 
        } 
    } 
  
    int crossMaxLen = 0, crossMidRow, crossMidCol;
  
    for (int i = 0; i < N; i++) 
    { 
        for (int j = 0; j < N; j++) 
        { 
            int len = min(min(top[i][j], bottom[i][j]), 
                          min(left[i][j], right[i][j])); 

            if (len > crossMaxLen) {
                crossMaxLen = len;
				crossMidRow = i;
				crossMidCol = j;
			}

			cout << mat[i][j] << " ";
        }

		cout << endl;
    } 
	
	int* results = new int[3];
    if (crossMaxLen) {
		results[0] = 2 * (crossMaxLen - 1) + 1;
		results[1] = crossMidRow;
		results[2] = crossMidCol;
		return results;
	}
  
    return 0;
} 
  
///* Driver function to test above functions */
int main() 
{ 
    // Binary Matrix of size N 
    int mat[N][N] = 
    { 
        { 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1 }, 
        { 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1 }, 
        { 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1 }, 
        { 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1 }, 
        { 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1 }, 
        { 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 1 }, 
        { 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1 }, 
        { 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1 }, 
        { 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 0, 1, 1, 1 }, 
        { 1, 0, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1 },
		{ 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1 },
		{ 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1 },
		{ 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 0, 1 },
		{ 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1 },
		{ 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1 }
    }; 

	int* results = findLargestPlus(mat);

    cout << "Cross length: " << results[0] << endl;
	cout << "Cross row: " << results[1] << endl; 
	cout << "Cross column: " << results[2] << endl; 
  
    return 0; 
} 