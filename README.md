
# Nightride FM Discord RPC
**Nightride FM Discord RPC** is a tool that lets you showcase your current [Nightride.fm](https://nightride.fm) song on your Discord profile using Rich Presence.

This guide will walk you through setting up the browser extension and local server needed for the RPC to work.

![nrfm logo](https://github.com/user-attachments/assets/a21ee265-7544-4661-9a3e-8dce05867664)

### **What is [Discord Rich Presence (RPC)](https://github.com/discord/discord-rpc)?** <br>
Rich Presence allows you to display detailed information on your Discord profile, such as the song you're listening to or the game you're playing.
  
# How to use and set up Nightride FM Discord RPC (Rich Presence)
<br>

## Prerequisites
- Browser Compatibility: Currently supports Chromium-based browsers (Chrome, Opera, Edge, etc.). Firefox support may be added in the future.
- Windows operating system (for now)
- [Node.js](https://nodejs.org) installed (minimum version 16.20.2)

  <br>

## 1) Load the browser extension:
In order for the program to fetch the song details from nightride.fm, it needs
to track the nightride.fm tab, extract the song details and send it to the
back-end server (I’ll talk about that later). Here’s how to load the extension:

1) Open up your browser > **Go to the Extensions Manager (Ctrl + Shift + E)**
2) Enable **Developer mode**
3) Drag the Extension folder and drop it in the Extension Manager
   ![Extensiondragndrop-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/32674285-a8b9-4bb2-91b1-1ed85e9001d0)

<br>**OR**<br>
<br>
Click **Load Unpacked**, locate to the Extension directory, click **Select Folder**
![LoadUnpacked-ezgif com-video-to-gif-converter](https://github.com/user-attachments/assets/62ba97ce-8663-4f4c-aa42-1d407dc24fb1)

<br> <br>
***(If you see any errors in the extension, don’t worry it’s just the extension trying to
connect to the server constantly)***

<br><br>
## 2) Download NodeJs:
**If you already have NodeJs installed on your computer then you can skip
this step.**

If you don’t have NodeJs, make sure to run the “**node-v16.20.2-x64.msi**”
file, NodeJs is incredibly essential for the RPC to work! 

***(If you have a newer version, you’re also good to go)***

**• Step by step:**
1) Double click the nodejs setup file
2) Click **Next** <br>
![Screenshot 2024-12-14 212722](https://github.com/user-attachments/assets/73276b4d-2baf-48c7-ad65-51ae3dafbde1)
<br>

3) Check the accept box, and click **Next** <br>
![Screenshot 2024-12-14 212805](https://github.com/user-attachments/assets/cc6c02b9-035e-4e1a-8635-dcc0ef18d497)
<br>

4) Select the installation directory and click **Next** <br>
![Screenshot 2024-12-14 213010](https://github.com/user-attachments/assets/30540383-a063-428f-b377-31362f5ff388)
<br>

5) Click **Next** <br>
![Screenshot 2024-12-14 213117](https://github.com/user-attachments/assets/43b43e17-21ba-4c62-b2ca-9517e72a28b8)
<br>

6) Keep it as it is and click **Next** <br>
![Screenshot 2024-12-14 213124](https://github.com/user-attachments/assets/12c7bdb9-25cb-48d7-b1f4-3181e0ebc9ac)
<br>

7) Click **Install**, a window will pop up, click **Yes** <br>
![Screenshot 2024-12-14 213129](https://github.com/user-attachments/assets/005c7120-3714-4f8d-b1c6-fae512257d83)
<br>

8) Once finished downloading, click **Finish** <br>
![Screenshot 2024-12-14 213145](https://github.com/user-attachments/assets/1f7d224c-e3dc-4e0a-9aa0-d0e596882df0)
<br>


## 3) Installing the service and running the server:
Before we begin the installation, I want to explain how the back-end server
works with a simplified diagram: 

![image](https://github.com/user-attachments/assets/307926e0-093c-49b1-977c-0186be9c7b0d)

The server is local, meaning it only runs on **YOUR** computer and **DOES NOT**
send any signal nor request to any endpoint except the extension to fetch
the song details from the nightride.fm tab, so no need to worry about any
malicious activity. **You can check the code in the files to verify.**

<br>

### Let's install the service:
1) Type ``cmd`` in the directory at the top and press **Enter**

![Screenshot 2024-12-14 220350](https://github.com/user-attachments/assets/53350907-48b8-4e71-9ff0-1e9f1264c56d)

<br>

2) Run the command ``node install-service.js``

![Screenshot 2024-12-14 221240](https://github.com/user-attachments/assets/66665666-5d83-4d42-95d6-3878de1774c3)

<br>

3) **A few windows will pop up, so keep clicking Yes until it shows this:**

![Screenshot 2024-12-14 221302](https://github.com/user-attachments/assets/be5d99fb-e603-46b9-880c-424ebb40759c)

<br>

### If you want to uninstall the service:
Repeat the same installation steps, but run ``node uninstall-service.js`` instead, it should look like this:

![Screenshot 2024-12-14 222149](https://github.com/user-attachments/assets/5efcf28b-659d-4b39-b500-2372ef58886f)


### How to verify if the service is installed:
1) Press **Win + R**
2) Type **services.msc** and press **Enter**
3) Scroll down and find the **Nightride FM RPC** service:

![Screenshot 2024-12-14 222112](https://github.com/user-attachments/assets/8589e0ab-53eb-405b-8035-b3bffa5b69ca)

***If it’s there that means it’s been successfully installed, otherwise it means it’s not
installed/uninstalled.***

<br>

## 4) Enable Rich Presence settings in Discord:
1) Go to user settings

![Screenshot 2024-12-14 233033](https://github.com/user-attachments/assets/94659e21-28ad-493e-949f-4c7f8c1269a8)

2) Scroll down to Activity Privacy and make sure these settings are on:

![Screenshot 2024-12-14 233204](https://github.com/user-attachments/assets/4d0a57f4-e2c7-49b5-a5b9-f634950eede4)



**You're now good to go!**

![image](https://github.com/user-attachments/assets/66fac479-75b4-4961-921c-0be457b7354e)

## Troubleshooting

- **Discord Rich Presence doesn't show**
  
  Ensure you’ve enabled Rich Presence in Discord settings under `Activity Privacy`. And that you've loaded the extension correctly, and you have a nightride.fm tab open.

- **Server not working**
  
   Make sure that you've installed the service correctly, for safe measure, uninstall and reinstall the service again (with the steps provided).


<br> 
<br> 

***Please note that this is a first-time setup only, and you won’t have to do
all of this again. Refer to the guide again if you need
any help.***

**If you have any questions, suggestions or feedback, please fill out this [Google form](https://forms.gle/t8k2kMfaV3MAwxUs8) <3**

